"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[866],{9866:(e,t,o)=>{o.d(t,{submitForm:()=>i,uploadFile:()=>a});let r=o(7358).env.NEXT_PUBLIC_API_URL;async function i({endpoint:e,data:t,onSuccess:o,onError:i}){if(!r){let e=`
      <div style="text-align: left;">
        <h3>Thank you for your submission!</h3>
        <p>This demo is running on GitHub Pages without a backend server.</p>
        <p>In a production environment, your form would be submitted to our secure servers.</p>
        <br/>
        <p><strong>Your form data:</strong></p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">
${JSON.stringify(t,null,2)}
        </pre>
        <br/>
        <p><strong>To submit this application:</strong></p>
        <ul style="list-style: disc; padding-left: 2rem;">
          <li>Email us at: loans@aagtprivateloans.com.au</li>
          <li>Call us at: 1300 XXX XXX</li>
          <li>Or visit our office for a consultation</li>
        </ul>
      </div>
    `;return o&&o({success:!0,message:e,isDemo:!0}),{success:!0,message:e,isDemo:!0}}let a=r?`${r}${e}`:e;try{let e=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),r=await e.json();if(e.ok)return o&&o(r),r;{let e=r.error||"Submission failed. Please try again.";throw i&&i(e),Error(e)}}catch(t){let e=t instanceof Error?t.message:"Network error. Please try again.";throw i&&i(e),t}}async function a(e,t){if(!r)return{success:!0,file:{id:Math.random().toString(36).substr(2,9),originalName:e.name,filename:e.name,size:e.size,mimetype:e.type,category:t,uploadedAt:new Date().toISOString(),url:URL.createObjectURL(e)},isDemo:!0,message:"File stored locally for demo. In production, files are securely uploaded to our servers."};let o=new FormData;o.append("file",e),o.append("category",t);let i=r?`${r}/api/upload-document`:"/api/upload-document",a=await fetch(i,{method:"POST",body:o});if(!a.ok)throw Error("Upload failed");return a.json()}}}]);