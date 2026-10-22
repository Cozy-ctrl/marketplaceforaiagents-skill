#!/usr/bin/env node
const fs=require('fs'),path=require('path'),os=require('os');
const a=process.argv.slice(2),src=path.join(__dirname,'skills','marketplaceforaiagents','SKILL.md'),H=os.homedir();
const all={claude:path.join(H,'.claude'),cursor:path.join(H,'.cursor'),codex:path.join(H,'.codex')};
let t=[];
if(a.includes('--project'))t.push(path.join(process.cwd(),'.claude'));
for(const k of Object.keys(all))if(a.includes('--'+k))t.push(all[k]);
if(!t.length){t=Object.values(all).filter(d=>fs.existsSync(d));if(!t.length)t=[all.claude];}
for(const b of t){const d=path.join(b,'skills','marketplaceforaiagents');fs.mkdirSync(d,{recursive:true});fs.copyFileSync(src,path.join(d,'SKILL.md'));console.log('Installed ->',path.join(d,'SKILL.md'));}
console.log('Done. Restart your agent to load the marketplaceforaiagents skill.');
