    "use strict";

    const svg = document.getElementById("gearSvg");

    const teeth1Input = document.getElementById("teeth1");
    const teeth2Input = document.getElementById("teeth2");
    const speedInput = document.getElementById("speed");
    const marker1OffsetInput = document.getElementById("marker1Offset");
    const marker2OffsetInput = document.getElementById("marker2Offset");

    const teeth1Value = document.getElementById("teeth1Value");
    const teeth2Value = document.getElementById("teeth2Value");
    const speedValue = document.getElementById("speedValue");
    const marker1Value = document.getElementById("marker1Value");
    const marker2Value = document.getElementById("marker2Value");

    const gear1Root = document.getElementById("gear1Root");
    const gear2Root = document.getElementById("gear2Root");
    const gear1Rotation = document.getElementById("gear1Rotation");
    const gear2Rotation = document.getElementById("gear2Rotation");
    const gear1Marker = document.getElementById("gear1Marker");
    const gear2Marker = document.getElementById("gear2Marker");

    const gear1Path = document.getElementById("gear1Path");
    const gear2Path = document.getElementById("gear2Path");

    const gear1Pitch = document.getElementById("gear1Pitch");
    const gear2Pitch = document.getElementById("gear2Pitch");
    const gear1Hand = document.getElementById("gear1Hand");
    const gear2Hand = document.getElementById("gear2Hand");
    const gear1MarkerHit = document.getElementById("gear1MarkerHit");
    const gear2MarkerHit = document.getElementById("gear2MarkerHit");
    const gear1MarkerHandle = document.getElementById("gear1MarkerHandle");
    const gear2MarkerHandle = document.getElementById("gear2MarkerHandle");
    const gear1HitCircle = document.getElementById("gear1HitCircle");
    const gear2HitCircle = document.getElementById("gear2HitCircle");

    const gear1Caption = document.getElementById("gear1Caption");
    const gear2Caption = document.getElementById("gear2Caption");

    const contactLine = document.getElementById("contactLine");
    const contactPoint = document.getElementById("contactPoint");

    const angle1Text = document.getElementById("angle1Text");
    const angle2Text = document.getElementById("angle2Text");
    const angleRatioText = document.getElementById("angleRatioText");
    const passedTeethText = document.getElementById("passedTeethText");
    const turnCount1Text = document.getElementById("turnCount1Text");
    const turnCount2Text = document.getElementById("turnCount2Text");
    const fractionText = document.getElementById("fractionText");
    const formulaResult = document.getElementById("formulaResult");
    const explanationText = document.getElementById("explanationText");

    const togglePlayButton = document.getElementById("togglePlay");
    const reverseButton = document.getElementById("reverse");
    const resetButton = document.getElementById("reset");
    const resetMarkersButton = document.getElementById("resetMarkers");
    const minus30Button = document.getElementById("minus30");
    const plus30Button = document.getElementById("plus30");

    const state = {
      teeth1: Number(teeth1Input.value),
      teeth2: Number(teeth2Input.value),
      angle1: 0,
      angle2: 0,
      turnCount1: 0,
      turnCount2: 0,
      turnProgress1: 0,
      turnProgress2: 0,
      lastTrackedAngle1: 0,
      lastTrackedAngle2: 0,
      markerOffset1: Number(marker1OffsetInput.value),
      markerOffset2: Number(marker2OffsetInput.value),
      speed: Number(speedInput.value),
      direction: 1,
      playing: false,
      lastFrameTime: null,
      layout: null,
      drag: null
    };

    let audioContext = null;

    function ensureAudioContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;

      if (!audioContext) {
        audioContext = new AudioContextClass();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      return audioContext;
    }

    function playTurnClick(gearNumber) {
      const context = ensureAudioContext();
      if (!context) return;

      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(gearNumber === 1 ? 720 : 560, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        gearNumber === 1 ? 520 : 390,
        now + 0.045
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.06);
    }

    function updateTurnCounters() {
      const delta1 = Math.abs(state.angle1 - state.lastTrackedAngle1);
      const delta2 = Math.abs(state.angle2 - state.lastTrackedAngle2);

      state.turnProgress1 += delta1;
      state.turnProgress2 += delta2;

      const newTurns1 = Math.floor((state.turnProgress1 + 1e-9) / 360);
      const newTurns2 = Math.floor((state.turnProgress2 + 1e-9) / 360);

      if (newTurns1 > 0) {
        state.turnCount1 += newTurns1;
        state.turnProgress1 -= newTurns1 * 360;
        for (let i = 0; i < newTurns1; i += 1) {
          playTurnClick(1);
        }
      }

      if (newTurns2 > 0) {
        state.turnCount2 += newTurns2;
        state.turnProgress2 -= newTurns2 * 360;
        for (let i = 0; i < newTurns2; i += 1) {
          playTurnClick(2);
        }
      }

      state.lastTrackedAngle1 = state.angle1;
      state.lastTrackedAngle2 = state.angle2;
    }

    function normalizeDelta(degrees) {
      let value = degrees;
      while (value > 180) value -= 360;
      while (value < -180) value += 360;
      return value;
    }

    function normalizeAngle(degrees) {
      return ((degrees % 360) + 360) % 360;
    }

    function formatNumber(value, digits = 2) {
      const cleaned = Math.abs(value) < 0.0000001 ? 0 : value;
      return cleaned.toLocaleString("tr-TR", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      });
    }

    function pointOnCircle(radius, angle) {
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    }

    function involuteFunction(parameter) {
      return parameter - Math.atan(parameter);
    }

    function involuteParameterAtRadius(radius, baseRadius) {
      const ratio = Math.max(1, radius / baseRadius);
      return Math.sqrt(ratio * ratio - 1);
    }

    function addPolarArc(points, radius, startAngle, endAngle, segments) {
      for (let i = 1; i <= segments; i += 1) {
        const amount = i / segments;
        const angle = startAngle + (endAngle - startAngle) * amount;
        points.push(pointOnCircle(radius, angle));
      }
    }

    function makeGearPath(teeth, pitchRadius, moduleSize) {
      /*
        Standart düz dişli geometrisi:
        r  = m·z / 2          adım yarıçapı
        rb = r·cos(α)         taban yarıçapı
        ra = r + m            tepe yarıçapı
        rf = r - 1,25·m       kök yarıçapı

        Buradaki moduleSize gerçek modül m'dir. Diş yanakları,
        taban çemberinden başlayan evolvent eğrisinden örneklenir.
      */
      const pressureAngle = 20 * Math.PI / 180;
      const baseRadius = pitchRadius * Math.cos(pressureAngle);
      const outerRadius = pitchRadius + moduleSize;
      const rootRadius = Math.max(moduleSize * 0.8, pitchRadius - 1.25 * moduleSize);
      const toothPitchAngle = (Math.PI * 2) / teeth;
      const halfToothAngleAtPitch = Math.PI / (2 * teeth);

      const pitchParameter = involuteParameterAtRadius(pitchRadius, baseRadius);
      const pitchInvolute = involuteFunction(pitchParameter);
      const outerParameter = involuteParameterAtRadius(outerRadius, baseRadius);
      const flankSamples = 9;
      const points = [];

      for (let tooth = 0; tooth < teeth; tooth += 1) {
        const centerAngle = tooth * toothPitchAngle;
        const valleyStartAngle = centerAngle - toothPitchAngle / 2;
        const valleyEndAngle = centerAngle + toothPitchAngle / 2;
        const baseHalfAngle = halfToothAngleAtPitch + pitchInvolute;

        const leftRootAngle = centerAngle - baseHalfAngle;
        const rightRootAngle = centerAngle + baseHalfAngle;

        if (points.length === 0) {
          points.push(pointOnCircle(rootRadius, valleyStartAngle));
        }

        addPolarArc(points, rootRadius, valleyStartAngle, leftRootAngle, 3);
        points.push(pointOnCircle(baseRadius, leftRootAngle));

        const leftFlank = [];
        const rightFlank = [];

        for (let i = 0; i <= flankSamples; i += 1) {
          const amount = i / flankSamples;
          const parameter = outerParameter * amount;
          const radius = baseRadius * Math.sqrt(1 + parameter * parameter);
          const involuteAngle = involuteFunction(parameter);
          const halfAngle = halfToothAngleAtPitch + pitchInvolute - involuteAngle;

          leftFlank.push(pointOnCircle(radius, centerAngle - halfAngle));
          rightFlank.push(pointOnCircle(radius, centerAngle + halfAngle));
        }

        for (let i = 1; i < leftFlank.length; i += 1) {
          points.push(leftFlank[i]);
        }

        const outerInvolute = involuteFunction(outerParameter);
        const outerHalfAngle =
          halfToothAngleAtPitch + pitchInvolute - outerInvolute;
        const leftTipAngle = centerAngle - outerHalfAngle;
        const rightTipAngle = centerAngle + outerHalfAngle;

        addPolarArc(points, outerRadius, leftTipAngle, rightTipAngle, 4);

        for (let i = rightFlank.length - 2; i >= 0; i -= 1) {
          points.push(rightFlank[i]);
        }

        points.push(pointOnCircle(rootRadius, rightRootAngle));
        addPolarArc(points, rootRadius, rightRootAngle, valleyEndAngle, 3);
      }

      return points
        .map((point, index) => {
          const command = index === 0 ? "M" : "L";
          return `${command} ${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
        })
        .join(" ") + " Z";
    }

    function calculateLayout() {
      const maxRadius = 182;
      const maxTotalPitchDiameter = 700;
      const moduleSize = Math.min(
        24,
        (2 * maxRadius) / Math.max(state.teeth1, state.teeth2),
        (2 * maxTotalPitchDiameter) / (state.teeth1 + state.teeth2)
      );

      const pitchRadius1 = state.teeth1 * moduleSize / 2;
      const pitchRadius2 = state.teeth2 * moduleSize / 2;
      const centerDistance = pitchRadius1 + pitchRadius2;
      const centerX = 500;
      const centerY = 240;

      return {
        moduleSize,
        pitchRadius1,
        pitchRadius2,
        center1: {
          x: centerX - centerDistance / 2,
          y: centerY
        },
        center2: {
          x: centerX + centerDistance / 2,
          y: centerY
        },
        contact: {
          x: centerX - centerDistance / 2 + pitchRadius1,
          y: centerY
        }
      };
    }

    function updateGearGeometry() {
      state.layout = calculateLayout();
      const layout = state.layout;

      const path1 = makeGearPath(state.teeth1, layout.pitchRadius1, layout.moduleSize);
      const path2 = makeGearPath(state.teeth2, layout.pitchRadius2, layout.moduleSize);

      gear1Path.setAttribute("d", path1);
      gear2Path.setAttribute("d", path2);

      gear1Pitch.setAttribute("r", layout.pitchRadius1);
      gear2Pitch.setAttribute("r", layout.pitchRadius2);

      gear1HitCircle.setAttribute("r", layout.pitchRadius1 + layout.moduleSize);
      gear2HitCircle.setAttribute("r", layout.pitchRadius2 + layout.moduleSize);

      const markerLength1 = Math.max(34, layout.pitchRadius1 * 0.72);
      const markerLength2 = Math.max(34, layout.pitchRadius2 * 0.72);

      gear1Hand.setAttribute("x2", markerLength1);
      gear2Hand.setAttribute("x2", markerLength2);
      gear1MarkerHit.setAttribute("x2", markerLength1);
      gear2MarkerHit.setAttribute("x2", markerLength2);
      gear1MarkerHandle.setAttribute("cx", markerLength1);
      gear2MarkerHandle.setAttribute("cx", markerLength2);

      gear1Root.setAttribute(
        "transform",
        `translate(${layout.center1.x} ${layout.center1.y})`
      );
      gear2Root.setAttribute(
        "transform",
        `translate(${layout.center2.x} ${layout.center2.y})`
      );

      gear1Caption.setAttribute("x", layout.center1.x);
      gear1Caption.setAttribute(
        "y",
        layout.center1.y + layout.pitchRadius1 + layout.moduleSize + 52
      );
      gear2Caption.setAttribute("x", layout.center2.x);
      gear2Caption.setAttribute(
        "y",
        layout.center2.y + layout.pitchRadius2 + layout.moduleSize + 52
      );

      contactLine.setAttribute("x1", layout.contact.x);
      contactLine.setAttribute("y1", layout.contact.y - 54);
      contactLine.setAttribute("x2", layout.contact.x);
      contactLine.setAttribute("y2", layout.contact.y + 54);
      contactPoint.setAttribute("cx", layout.contact.x);
      contactPoint.setAttribute("cy", layout.contact.y);
    }
