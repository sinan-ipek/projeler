/* Check Liste v1.30.0 — TeX-quality inline math for German/Turkish questions and solutions.
 * Safe renderer: every prose span uses textContent; only equations are sent to KaTeX.
 * Supports explicit \( ... \) / \[ ... \] and automatic detection in legacy data.
 */
(function(){
'use strict';
const unitNames=new Set(['m','cm','mm','km','kg','mg','g','t','h','min','s','ct','LE','C','€','%']);
const units='cm|mm|km|kg|mg|min|ct|LE|m|g|t|h|s';
const supMap={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+','ⁿ':'n'};
const opOnly=/^[+\-−·×÷=≤≥<>≈≠:→∈∩∪]$/;
const mathChars=/^[0-9A-Za-zπℝ∞√□¬½°€%⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿ′″'_,.;:|(){}\[\]+\-−·×÷/*^=≤≥<>≈≠→∈∩∪]+$/u;
const number=/^[+\-−]?\d+(?:[.,]\d+)?$/;
const variable=/^(?:[a-zA-Z]|π|∞|ℝ)(?:[′″']{1,2}|[₀₁₂₃₄₅₆₇₈₉])?$/u;
const functionRef=/^(?:[a-zA-Z][′″']{0,2}|P)\([^\s]*\)$/u;
const strong=/[=+\-−·×÷^²³⁴⁵⁶⁷⁸⁹ⁿ½√≤≥≠≈→∈∩∪□]|(?:\d+\/\d+)|(?:[a-zA-Z][′″])/u;
function tokenParts(word){
 let s=word,prefix='',suffix='';
 // Turkish case suffix after a number belongs to prose, not to the equation.
 const attachedSuffix=s.match(/^(.+?)([’'](?:te|ta|de|da|ten|tan|den|dan))$/i);
 if(attachedSuffix){s=attachedSuffix[1];suffix=attachedSuffix[2]}
 while(s&&/^[“„«"'‹]/.test(s)){prefix+=s[0];s=s.slice(1)}
 while(s&&/[.!?;,»”"']$/.test(s)){
  // A prime is part of a mathematical symbol, not punctuation.
  if(s.endsWith("'")&&/[A-Za-z]'+$/.test(s))break;
  suffix=s.slice(-1)+suffix;s=s.slice(0,-1);
 }
 return {prefix,core:s,suffix};
}
function mathToken(core){
 if(!core||/^[a-zA-Z]\)$/.test(core))return false; // a), b): question labels, not algebra.
 if(opOnly.test(core)||number.test(core)||variable.test(core)||unitNames.has(core)||/^(?:cm|mm|km|kg|mg|min|ct|LE|m|g|t|h|s)[²³⁴⁵]$/.test(core))return true;
 if(!mathChars.test(core))return false;
 // In formulas like f(x)=ax³+bx²+cx+d the pairs ax, bx, cx are
 // algebraic monomials, NOT prose. Handle them before word detection.
 if(/[=≤≥≈≠]/.test(core)&&/[A-Za-z0-9]/.test(core))return true;
 if(/[\^²³⁴⁵⁶⁷⁸⁹]/.test(core)&&/\d|[()[\]]/.test(core))return true;
 if(/^(?:ln|sin|cos|tan|log|exp)$/.test(core))return true;
 // Natural-language words must never be mistaken for mathematical variables.
 if(/[a-zA-Z]{2,}/.test(core.replace(/\b(?:sqrt|sin|cos|tan|lim|log|exp|max|min|frac|cdot|mathbb)\b/g,'x').replace(/^(?:cm|mm|km|kg|mg|min|ct|LE)(?=[²³⁴⁵]?\b|[²³⁴⁵]?$)/,'x')))return false;
 if(/^\d+(?:\d+)?[a-zA-Z]{3,}$/.test(core))return false;
 return /[0-9a-zA-Zπℝ∞√□²³|=^()\/]/u.test(core);
}
function standaloneMath(core){
 return variable.test(core)||functionRef.test(core)||/[²³⁴⁵⁶⁷⁸⁹ⁿ½√∞πℝ□]|(?:\d+\/\d+)|(?:[A-Za-z][′″])/u.test(core);
}
// Parenthesized and square-bracket powers need a COMPLETE exponent.
// TeX parses e^[(a+b)] incorrectly as just an opening bracket superscript.
function groupPowers(source){
 let out='';
 for(let i=0;i<source.length;){
  if(source[i]==='^'&&'([{'.includes(source[i+1]||'')){
   const open=source[i+1],close={'(':')','[':']','{':'}'}[open];
   let depth=1,j=i+2;
   while(j<source.length&&depth>0){
    if(source[j]===open)depth++;
    else if(source[j]===close)depth--;
    if(depth>0)j++;
   }
   if(depth===0){
    out+='^{'+source.slice(i+2,j)+'}';i=j+1;continue;
   }
  }
  out+=source[i++];
 }
 return out;
}
function expressionToTex(expr){
 let t=String(expr).trim().replace(/\u00a0/g,' ');
 // Replace Unicode and typographic operators with TeX semantics.
 t=t.replace(/−/g,'-').replace(/·/g,' \\cdot ').replace(/×/g,' \\times ')
   .replace(/÷/g,' \\div ').replace(/≤/g,' \\le ').replace(/≥/g,' \\ge ')
   .replace(/≠/g,' \\ne ').replace(/≈/g,' \\approx ')
   .replace(/→/g,' \\to ').replace(/∞/g,'\\infty ')
   .replace(/∈/g,' \\in ').replace(/∩/g,' \\cap ').replace(/∪/g,' \\cup ')
   .replace(/ℝ/g,'\\mathbb{R}').replace(/π/g,'\\pi ').replace(/¬/g,'\\neg ')
   .replace(/½/g,'\\frac{1}{2}').replace(/□/g,'\\square ').replace(/°C/g,'^{\\circ}\\mathrm{C}')
   .replace(/√\(([^()]*)\)/g,'\\sqrt{$1}')
   .replace(/√(\d+)/g,'\\sqrt{$1}')
   .replace(/[′″]/g,v=>v==='′'?"'":"''");
 // Superscript glyphs (x², t³, m², etc.).
 t=t.replace(/([A-Za-z0-9)\]}])([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿ]+)/g,(_m,base,sup)=>base+'^{'+[...sup].map(c=>supMap[c]).join('')+'}');
 // Powers with parentheses or brackets, including nested expressions.
 t=groupPowers(t);
 // Single-token exponent: a^t, x^2
 t=t.replace(/\^([+\-]?\d+(?:[.,]\d+)?|[a-zA-Z])/g,(_m,part)=>'^{'+part+'}');
 // Genuine inline numeric fractions, not a slash in a web path.
 t=t.replace(/(?<![A-Za-z0-9\\])(\d+)\/(\d+)(?![A-Za-z0-9])/g,(_m,a,b)=>'\\frac{'+a+'}{'+b+'}');
 // Algebraic terms over numeric denominators also use a stacked fraction.
 t=t.replace(/(?<![A-Za-z0-9\\])((?:\d+)?[a-zA-Z](?:\^\{[^{}]+\})?)\/(\d+)(?![A-Za-z0-9])/g,(_m,a,b)=>'\\frac{'+a+'}{'+b+'}');
 // Decimal comma remains comma, but not KaTeX punctuation spacing.
 t=t.replace(/(\d),(\d)/g,'$1{,}$2');
 // Coordinate separators, probability separator.
 t=t.replace(/\|/g,' \\mid ');
 // Keep standard mathematical functions upright.
 t=t.replace(/(?<!\\)\b(ln|sin|cos|tan|lim|log|exp)\b/g,(_m,name)=>'\\'+name);
 // Units are upright, while symbolic variables remain italic.
 t=t.replace(new RegExp('(\\d|\\}|\\))\\s+('+units+')\\b','g'),(_m,lead,u)=>lead+'\\,\\mathrm{'+u+'}');
 t=t.replace(/%/g,'\\%');
 t=t.replace(/€/g,'\\,\\text{€}');
 return t;
}
function segmentLine(line){
 // Protect explicitly authored TeX fragments first. Other text is auto-detected.
 const pieces=[],explicit=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
 let last=0,match;
 while((match=explicit.exec(line))){
  if(match.index>last)pieces.push(...segmentPlain(line.slice(last,match.index)));
  pieces.push({math:match[1]??match[2],explicit:true,display:match[2]!=null});
  last=explicit.lastIndex;
 }
 if(last<line.length)pieces.push(...segmentPlain(line.slice(last)));
 return pieces;
}
function segmentPlain(line){
 const words=line.match(/\S+|\s+/g)||[];
 const out=[];
 let i=0;
 function pushText(t){
  if(!t)return;
  if(out.length&&Object.hasOwn(out[out.length-1],'text'))out[out.length-1].text+=t;
  else out.push({text:t});
 }
 while(i<words.length){
  if(/^\s+$/.test(words[i])){pushText(words[i++]);continue}
  const start=i,parts=tokenParts(words[i]);
  if(!mathToken(parts.core)){pushText(words[i++]);continue}
  let j=i,cores=[],raw='',hasStrong=false,hasStandalone=false,suffix='',prefix=parts.prefix;
  while(j<words.length){
   if(/^\s+$/.test(words[j])){
    const next=words[j+1]&&tokenParts(words[j+1]).core;
    const closingMath=next&&/^[a-zA-Z]\)$/.test(next)
      &&((raw.match(/\(/g)||[]).length>(raw.match(/\)/g)||[]).length);
    if(!next||(!mathToken(next)&&!closingMath))break;
    raw+=words[j++];continue;
   }
   const item=tokenParts(words[j]);
   const isClosingMathToken=/^[a-zA-Z]\)$/.test(item.core)
     &&j>start&&((raw.match(/\(/g)||[]).length>(raw.match(/\)/g)||[]).length);
   if(!mathToken(item.core)&&!isClosingMathToken)break;
   if(j>start&&item.prefix)break;
   cores.push(item.core);raw+=item.core;
   hasStrong=hasStrong||strong.test(item.core)||opOnly.test(item.core);
   hasStandalone=hasStandalone||standaloneMath(item.core);
   suffix=item.suffix;j++;
   if(suffix)break;
  }
  // Equations and true math atoms get KaTeX. Prose and isolated ordinary values stay text.
  if(cores.length&&(hasStrong||hasStandalone)){
   pushText(prefix);
   out.push({math:raw.trim(),explicit:false});
   pushText(suffix);
  }else{
   pushText(words.slice(start,j).join(''));
  }
  i=j>start?j:start+1;
 }
 return out;
}
function appendMath(parent,tex,display,raw){
 const span=document.createElement(display?'div':'span');
 span.className=display?'check-math-display':'check-math-inline';
 span.setAttribute('data-source-math',raw);
 if(window.katex&&typeof window.katex.render==='function'){
  try{
   window.katex.render(tex,span,{displayMode:!!display,throwOnError:true,strict:'ignore',trust:false,output:'htmlAndMathml'});
   parent.appendChild(span);return;
  }catch(err){
   // Never show a bogus equation if the original text has unsupported notation.
   console.warn('Check Liste: could not typeset math',raw,err);
  }
 }
 span.textContent=raw;
 parent.appendChild(span);
}
function render(element,source){
 if(!element)return;
 const original=String(source??'');
 if(!window.katex||typeof window.katex.render!=='function'){
  element.textContent=original;return;
 }
 const frag=document.createDocumentFragment();
 const lines=original.split('\n');
 lines.forEach((line,index)=>{
  if(index)frag.appendChild(document.createTextNode('\n'));
  for(const part of segmentLine(line)){
   if(Object.hasOwn(part,'text'))frag.appendChild(document.createTextNode(part.text));
   else appendMath(frag,part.explicit?part.math:expressionToTex(part.math),part.display,part.math);
  }
 });
 element.replaceChildren(frag);
}
window.CheckMath={render,segments:segmentLine,tex:expressionToTex};
})();