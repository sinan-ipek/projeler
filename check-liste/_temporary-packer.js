
/* Temporary conversion utility: compresses existing 7th-grade GitHub data into
   a compact lossless Unicode JSON archive for transport. No book images. */
function createCourseTransport(source) {
 const start=source.indexOf("questions: ["),end=source.lastIndexOf("\n]\n};");
 if(start<0||end<0)throw Error("Data format unexpected");
 const questions=JSON.parse(source.slice(start+"questions: ".length,end+2));
 if(questions.length!==3080)throw Error("Question inventory changed: "+questions.length);
 const study={format:"check-liste-content-1",id:"lambacher-schweizer-7-nrw",title:"7. sınıf",version:"1.20.0",questions:questions.map(q=>[q.id,q.page,q.number,q.german,q.turkish,q.exercise||"",q.kind||"",q.privateImageFile||"",q.star?1:0,q.plus?1:0,q.parentId||"",q.sourcePage||0])};
 const json=JSON.stringify(study);
 function utf8(s){const out=[];for(const c of s){const x=c.codePointAt(0);if(x<128)out.push(x);else if(x<2048)out.push(0xc0|(x>>6),0x80|(x&63));else if(x<65536)out.push(0xe0|(x>>12),0x80|((x>>6)&63),0x80|(x&63));else out.push(0xf0|(x>>18),0x80|((x>>12)&63),0x80|((x>>6)&63),0x80|(x&63));}return Uint8Array.from(out);}
 function deflate(data){
  let a1=1,a2=0;for(let i=0;i<data.length;i++){a1+=data[i];if(a1>=65521)a1-=65521;a2+=a1;if(a2>=65521)a2-=65521;}
  const len=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
  const le=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
  const dist=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
  const de=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
  const output=[120,1];let bits=0,nbits=0;
  function w(v,k){bits|=(v<<nbits);nbits+=k;while(nbits>=8){output.push(bits&255);bits>>>=8;nbits-=8;}}
  function r(v,k){let z=0;for(let i=0;i<k;i++){z=(z<<1)|(v&1);v>>=1;}return z;}
  function l(x){let c,n;if(x<=143){c=x+48;n=8;}else if(x<=255){c=x-144+400;n=9;}else if(x<=279){c=x-256;n=7;}else{c=x-280+192;n=8;}w(r(c,n),n);}
  w(1,1);w(1,2);
  const prev=new Int32Array(data.length),last=new Int32Array(65536);last.fill(-1);
  const h=i=>((data[i]*31+data[i+1])*31+data[i+2])&65535;
  let p=0;
  while(p<data.length){
   let match=0,d=0;
   if(p+3<data.length){
    let candidate=last[h(p)],attempt=0;
    while(candidate>=0&&p-candidate<=32768&&attempt++<18){
     let ll=0,max=Math.min(258,data.length-p);
     while(ll<max&&data[candidate+ll]===data[p+ll])ll++;
     if(ll>match&&ll>=4){match=ll;d=p-candidate;if(ll===258)break;}
     candidate=prev[candidate];
    }
   }
   if(match>=4){
    let li=len.length-1;while(li>0&&match<len[li])li--;
    l(257+li);if(le[li])w(match-len[li],le[li]);
    let di=dist.length-1;while(di>0&&d<dist[di])di--;
    w(r(di,5),5);if(de[di])w(d-dist[di],de[di]);
    for(let j=0;j<match;j++)if(p+j+2<data.length){let key=h(p+j);prev[p+j]=last[key];last[key]=p+j;}
    p+=match;
   }else{
    l(data[p]);
    if(p+2<data.length){let key=h(p);prev[p]=last[key];last[key]=p;}
    p++;
   }
  }
  l(256);if(nbits)output.push(bits&255);
  const ad=((a2<<16)|a1)>>>0;output.push((ad>>>24)&255,(ad>>>16)&255,(ad>>>8)&255,ad&255);
  return output;
 }
 const bytes=deflate(utf8(json));
 const base="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
 let encoded="";for(let i=0;i<bytes.length;i+=3){
  const one=bytes[i],two=bytes[i+1],three=bytes[i+2];
  encoded+=base[one>>2]+base[((one&3)<<4)|((two===undefined?0:two)>>4)];
  encoded+=two===undefined?'=':base[((two&15)<<2)|((three===undefined?0:three)>>6)];
  encoded+=three===undefined?'=':base[three&63];
 }
 return {encoded,chars:json.length,numberOfCards:study.questions.length,compressedBytes:bytes.length};
}
