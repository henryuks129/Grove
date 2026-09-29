export const STORAGE_KEY = 'daylist.tasks.v1';
export const CATEGORIES = {work:'Work',learning:'Learning',personal:'Personal'};
export const STATUSES = {todo:'To do',progress:'In progress',done:'Done'};
export const PRIORITIES = {
  do: {name:'Do now',level:'P1',description:'Urgent & important',color:'#de685f'},
  schedule: {name:'Schedule',level:'P2',description:'Important, not urgent',color:'#8970d8'},
  delegate: {name:'Delegate',level:'P3',description:'Urgent, less important',color:'#ce9b42'},
  eliminate: {name:'Reconsider',level:'P4',description:'Neither urgent nor important',color:'#82908e'},
};
export const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const validDate = s => typeof s==='string' && (s==='' || (/^\d{4}-\d{2}-\d{2}$/.test(s) && dateKey(new Date(s+'T12:00:00'))===s));
export function validLink(url) {
  if(url==='') return true;
  try {const parsed=new URL(url);return ['https:','http:'].includes(parsed.protocol)&&!parsed.username&&!parsed.password;}catch{return false;}
}
export function normalizeTask(t) {
  if(!t || typeof t.id!=='string' || !t.id || typeof t.title!=='string' || !t.title.trim() || t.title.length>200 || !Object.hasOwn(CATEGORIES,t.category) || !Object.hasOwn(STATUSES,t.status) || !validDate(t.date) || !Number.isFinite(t.created)) throw new Error('Invalid saved task');
  const task={...t,priority:t.priority??'schedule',notes:t.notes??'',url:t.url??'',repeat:t.repeat??'none',nextId:t.nextId??null,avatarSeed:t.avatarSeed??t.id};
  if(!Object.hasOwn(PRIORITIES,task.priority) || typeof task.notes!=='string'||task.notes.length>4000||typeof task.url!=='string'||task.url.length>2048||!validLink(task.url)||!['none','daily','weekly'].includes(task.repeat)||(task.repeat!=='none'&&!task.date)||(task.nextId!==null&&typeof task.nextId!=='string')||typeof task.avatarSeed!=='string')throw new Error('Invalid task details');
  return task;
}
export function decode(raw) {
  if(raw===null) return {tasks:[],version:2};
  const data=JSON.parse(raw);
  if(![1,2].includes(data.version)||!Array.isArray(data.tasks))throw new Error('Unsupported saved data');
  const tasks=data.tasks.map(normalizeTask);
  if(new Set(tasks.map(t=>t.id)).size!==tasks.length)throw new Error('Duplicate task IDs');
  return {tasks,version:data.version};
}
export function nextDate(due,repeat,today=dateKey(new Date())) {
  const date=new Date(due+'T12:00:00');
  const days=repeat==='weekly'?7:1;
  do{date.setDate(date.getDate()+days);}while(dateKey(date)<=today);
  return dateKey(date);
}
// A completed occurrence generates only one successor, even after reopening.
export function completeTask(tasks,id,today=dateKey(new Date()),newId=()=>crypto.randomUUID()) {
  const task=tasks.find(t=>t.id===id);
  if(!task) return tasks;
  if(task.status==='done') return tasks.map(t=>t.id===id?{...t,status:'todo'}:t);
  let next=null;
  if(task.repeat!=='none'&&!task.nextId)next={...task,id:newId(),date:nextDate(task.date,task.repeat,today),created:Date.now(),status:'todo',nextId:null};
  const result=tasks.map(t=>t.id===id?{...t,status:'done',nextId:next?.id??t.nextId}:t);
  return next?[...result,next]:result;
}
export function sortTasks(tasks) {
  const rank=Object.keys(PRIORITIES);
  return [...tasks].sort((a,b)=>(a.status==='done')-(b.status==='done')||(a.date||'9999').localeCompare(b.date||'9999')||rank.indexOf(a.priority)-rank.indexOf(b.priority)||a.created-b.created);
}
