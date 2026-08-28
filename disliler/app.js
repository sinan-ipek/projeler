function syncAnglesFromGear1() {
      state.angle2 = -(state.teeth1 / state.teeth2) * state.angle1;
    }

    function syncAnglesFromGear2() {
      state.angle1 = -(state.teeth2 / state.teeth1) * state.angle2;
    }

    function getGear2Phase() {
      const toothPitch = 360 / state.teeth2;
      return 180 - toothPitch / 2;
    }

    function updateRotationTransforms() {
      const gear1FaceAngle = state.angle1;
      const gear2FaceAngle = getGear2Phase() + state.angle2;

      gear1Rotation.setAttribute("transform", `rotate(${gear1FaceAngle})`);
      gear2Rotation.setAttribute("transform", `rotate(${gear2FaceAngle})`);

      gear1Marker.setAttribute(
        "transform",
        `rotate(${state.angle1 + state.markerOffset1})`
      );
      gear2Marker.setAttribute(
        "transform",
        `rotate(${state.angle2 + state.markerOffset2})`
      );
    }

    function createExplanation() {
      const ratio = state.teeth2 / state.teeth1;
      const isInteger = Math.abs(ratio - Math.round(ratio)) < 0.000001;

      if (state.teeth1 === state.teeth2) {
        return "Diş sayıları eşit olduğu için iki dişli eşit büyüklükte açılarla, fakat ters yönlerde döner.";
      }

      if (state.teeth2 > state.teeth1) {
        const ratioText = isInteger
          ? `${Math.round(ratio)} katı`
          : `${formatNumber(ratio)} katı`;
        return `İkinci dişlinin diş sayısı birinci dişlinin ${ratioText} olduğu için, ikinci dişli daha küçük bir açıyla ve ters yönde döner.`;
      }

      const reverseRatio = state.teeth1 / state.teeth2;
      const reverseIsInteger = Math.abs(reverseRatio - Math.round(reverseRatio)) < 0.000001;
      const ratioText = reverseIsInteger
        ? `${Math.round(reverseRatio)} katı`
        : `${formatNumber(reverseRatio)} katı`;
      return `Birinci dişlinin diş sayısı ikinci dişlinin ${ratioText} olduğu için, ikinci dişli daha büyük bir açıyla ve ters yönde döner.`;
    }

    function updateReadouts() {
      const angleRatio = state.teeth2 / state.teeth1;
      const passedTeeth = Math.abs(state.teeth1 * state.angle1 / 360);
      const marker1Angle = Math.round(normalizeAngle(state.markerOffset1));
      const marker2Angle = Math.round(normalizeAngle(state.markerOffset2));

      teeth1Value.textContent = state.teeth1;
      teeth2Value.textContent = state.teeth2;
      speedValue.textContent = `${state.speed}°/sn`;

      marker1Value.textContent = `${marker1Angle}°`;
      marker2Value.textContent = `${marker2Angle}°`;
      marker1OffsetInput.value = marker1Angle;
      marker2OffsetInput.value = marker2Angle;

      gear1Caption.textContent = `${state.teeth1} diş`;
      gear2Caption.textContent = `${state.teeth2} diş`;

      angle1Text.textContent = `${formatNumber(state.angle1)}°`;
      angle2Text.textContent = `${formatNumber(state.angle2)}°`;
      angleRatioText.textContent = formatNumber(angleRatio);
      passedTeethText.textContent = formatNumber(passedTeeth);
      turnCount1Text.textContent = state.turnCount1;
      turnCount2Text.textContent = state.turnCount2;

      fractionText.textContent = `${state.teeth1} / ${state.teeth2}`;
      formulaResult.textContent = `${formatNumber(state.angle2)}°`;
      explanationText.textContent = createExplanation();
    }

    function render() {
      updateTurnCounters();
      updateRotationTransforms();
      updateReadouts();
    }

    function resetAngles() {
      state.angle1 = 0;
      state.angle2 = 0;
      state.turnCount1 = 0;
      state.turnCount2 = 0;
      state.turnProgress1 = 0;
      state.turnProgress2 = 0;
      state.lastTrackedAngle1 = 0;
      state.lastTrackedAngle2 = 0;
      render();
    }

    function resetMarkers() {
      state.markerOffset1 = 0;
      state.markerOffset2 = 0;
      render();
    }

    function changeAngle1(deltaDegrees) {
      state.angle1 += deltaDegrees;
      syncAnglesFromGear1();
      render();
    }

    function setPlaying(value) {
      state.playing = value;
      togglePlayButton.textContent = state.playing ? "Durdur" : "Başlat";
      state.lastFrameTime = null;
    }

    function clientPointToSvg(event) {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(svg.getScreenCTM().inverse());
    }

    function pointerAngle(event, center) {
      const point = clientPointToSvg(event);
      return Math.atan2(point.y - center.y, point.x - center.x) * 180 / Math.PI;
    }

    function beginGearDrag(event, gearNumber) {
      event.preventDefault();
      setPlaying(false);

      const center = gearNumber === 1
        ? state.layout.center1
        : state.layout.center2;

      state.drag = {
        type: "gear",
        pointerId: event.pointerId,
        gearNumber,
        center,
        lastPointerAngle: pointerAngle(event, center)
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    }

    function beginMarkerDrag(event, gearNumber) {
      event.preventDefault();
      event.stopPropagation();
      setPlaying(false);

      const center = gearNumber === 1
        ? state.layout.center1
        : state.layout.center2;

      state.drag = {
        type: "marker",
        pointerId: event.pointerId,
        gearNumber,
        center
      };

      event.currentTarget.setPointerCapture(event.pointerId);
      updateMarkerFromPointer(event);
    }

    function updateMarkerFromPointer(event) {
      if (!state.drag || state.drag.type !== "marker") return;

      const screenAngle = pointerAngle(event, state.drag.center);

      if (state.drag.gearNumber === 1) {
        state.markerOffset1 = normalizeAngle(screenAngle - state.angle1);
      } else {
        state.markerOffset2 = normalizeAngle(screenAngle - state.angle2);
      }

      render();
    }

    function moveDrag(event) {
      if (!state.drag || event.pointerId !== state.drag.pointerId) return;

      if (state.drag.type === "marker") {
        updateMarkerFromPointer(event);
        return;
      }

      const currentPointerAngle = pointerAngle(event, state.drag.center);
      const delta = normalizeDelta(currentPointerAngle - state.drag.lastPointerAngle);
      state.drag.lastPointerAngle = currentPointerAngle;

      if (state.drag.gearNumber === 1) {
        state.angle1 += delta;
        syncAnglesFromGear1();
      } else {
        state.angle2 += delta;
        syncAnglesFromGear2();
      }

      render();
    }

    function endDrag(event) {
      if (!state.drag || event.pointerId !== state.drag.pointerId) return;
      state.drag = null;
    }

    gear1Root.addEventListener("pointerdown", (event) => beginGearDrag(event, 1));
    gear2Root.addEventListener("pointerdown", (event) => beginGearDrag(event, 2));
    gear1Marker.addEventListener("pointerdown", (event) => beginMarkerDrag(event, 1));
    gear2Marker.addEventListener("pointerdown", (event) => beginMarkerDrag(event, 2));

    svg.addEventListener("pointermove", moveDrag);
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);

    teeth1Input.addEventListener("input", () => {
      state.teeth1 = Number(teeth1Input.value);
      resetAngles();
      updateGearGeometry();
      render();
    });

    teeth2Input.addEventListener("input", () => {
      state.teeth2 = Number(teeth2Input.value);
      resetAngles();
      updateGearGeometry();
      render();
    });

    speedInput.addEventListener("input", () => {
      state.speed = Number(speedInput.value);
      updateReadouts();
    });

    marker1OffsetInput.addEventListener("input", () => {
      state.markerOffset1 = Number(marker1OffsetInput.value);
      render();
    });

    marker2OffsetInput.addEventListener("input", () => {
      state.markerOffset2 = Number(marker2OffsetInput.value);
      render();
    });

    togglePlayButton.addEventListener("click", () => {
      setPlaying(!state.playing);
    });

    reverseButton.addEventListener("click", () => {
      state.direction *= -1;
    });

    resetButton.addEventListener("click", () => {
      setPlaying(false);
      resetAngles();
    });

    resetMarkersButton.addEventListener("click", () => {
      setPlaying(false);
      resetMarkers();
    });

    minus30Button.addEventListener("click", () => {
      setPlaying(false);
      changeAngle1(-30);
    });

    plus30Button.addEventListener("click", () => {
      setPlaying(false);
      changeAngle1(30);
    });

    function animationLoop(timestamp) {
      if (state.playing) {
        if (state.lastFrameTime === null) {
          state.lastFrameTime = timestamp;
        }

        const elapsedSeconds = Math.min(
          0.05,
          (timestamp - state.lastFrameTime) / 1000
        );

        state.lastFrameTime = timestamp;
        state.angle1 += state.direction * state.speed * elapsedSeconds;
        syncAnglesFromGear1();
        render();
      } else {
        state.lastFrameTime = null;
      }

      requestAnimationFrame(animationLoop);
    }

    document.addEventListener("pointerdown", ensureAudioContext, { once: true });
    document.addEventListener("keydown", ensureAudioContext, { once: true });

    updateGearGeometry();
    render();
    requestAnimationFrame(animationLoop);
