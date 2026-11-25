import {createRoot} from 'react-dom/client'
import {Fragment,useEffect,useMemo,useState} from 'react'
import './style.css'
import {Desk,select,categories,stages,value,formatDate,type State} from './desk'
const desk=new Desk()
const count=(state:State)=>Object.fromEntries(stages.map(stage=>[stage,state.records.filter(r=>r.stage===stage).length]))
function App(){
 const [s,set]=useState(desk.state)
 useEffect(()=>{const off=desk.subscribe(set);const stop=desk.start();return()=>{off();stop()}},[])
 const visible=useMemo(()=>select(s.records,s.query,s.filter,s.sort),[s.records,s.query,s.filter,s.sort])
 const totals=useMemo(()=>count(s),[s])
 return <>
<header className="top"><div className="wrap bar"><a className="brand" href="#board"><span className="mark" aria-hidden="true">⬡</span>School Street Trial Notebook</a><nav aria-label="Workspace"><a href="#board" aria-current={s.page==='board' ? 'page' : undefined}>Observations</a><a href="#guide" aria-current={s.page==='guide' ? 'page' : undefined}>Trial brief</a></nav></div></header>
<main className="wrap">
{s.page==='board'&&<>
<section className="hero"><div><p className="eyebrow">SCHOOL MOBILITY / WORK QUEUE</p><h1>School Street Trial Notebook</h1><p className="lead">Compare school-street observations before deciding whether a trial should continue.</p></div><button type="button" onClick={()=>{desk.edit()}}>New trial observation</button></section>
<section className="stats" aria-label="Queue by stage">{stages.map(stage=><Fragment key={stage}><div className="stat"><span className="stat-label">{stage}</span><strong>{totals[stage] ?? 0}</strong></div></Fragment>)}</section>
<section className="panel" aria-labelledby="queue"><div className="panel-head"><h2 id="queue">Trial observation queue</h2><span>{visible.length} visible</span></div>
<div className="filters"><label>Search records<input type="search" placeholder="School, observer or street" value={s.query} onChange={(e)=>{desk.set({query:value(e.nativeEvent)})}} /></label><label>Observation type<select aria-label="Observation type" value={s.filter} onChange={(e)=>{desk.set({filter:value(e.nativeEvent)})}}><option value="">All observation types</option>{categories.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Sort by<select aria-label="Sort by" value={s.sort} onChange={(e)=>{desk.set({sort:value(e.nativeEvent)})}}><option value="due">Due date</option><option value="title">Title</option></select></label></div>
{s.success&&<><p role="status" className="success">{s.success}</p></>}
{s.error&&<><p role="alert">{s.error}</p><button type="button" onClick={()=>{desk.load()}}>Reload list</button></>}
{s.loading&&<><p role="status">Loading records…</p></>}
{!s.loading && !s.error && visible.length===0&&<><p className="empty">No records match. Change the search or category.</p></>}
<ul className="records">{visible.map(row=><Fragment key={row.id}><li><div><strong>{row.title}</strong><small>{row.owner} · {row.context}</small><small className="measurement">People or vehicles counted: {row.amount}</small></div><span className="pill">{row.category}</span><span>{row.stage}</span><span>{formatDate(row.due)}</span><button type="button" className="secondary" onClick={()=>{desk.edit(row)}} aria-label={'Edit '+row.title}>Edit</button></li></Fragment>)}</ul></section></>}
{s.page==='editor'&&<><div className="inner"><a href="#board">← Back to work queue</a><p className="eyebrow">SCHOOL MOBILITY / RECORD</p><h1>{s.id?'Edit record':'New record'}</h1><form className="panel form" onSubmit={(e)=>{desk.save(e.nativeEvent)}}>
<label>Trial observation title<input required type="text" maxLength={100} value={s.draft.title} onChange={(e)=>{desk.field('title',e.nativeEvent)}} /></label><label>Field observer<input required type="text" maxLength={80} value={s.draft.owner} onChange={(e)=>{desk.field('owner',e.nativeEvent)}} /></label><label>Observation type<select aria-label="Observation type" value={s.draft.category} onChange={(e)=>{desk.field('category',e.nativeEvent)}}>{categories.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Stage<select aria-label="Stage" value={s.draft.stage} onChange={(e)=>{desk.field('stage',e.nativeEvent)}}>{stages.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Street and observation window<input required type="text" maxLength={100} value={s.draft.context} onChange={(e)=>{desk.field('context',e.nativeEvent)}} /></label><label>People or vehicles counted<input type="number" required min={0} max={2000} step={1} value={s.draft.amount ?? ''} onChange={(e)=>{desk.field('amount',e.nativeEvent)}} /></label><label>Due date<input required type="date"  value={s.draft.due} onChange={(e)=>{desk.field('due',e.nativeEvent)}} /></label>
<label className="wide">Field notes<textarea required maxLength={500} rows={3} value={s.draft.notes} onChange={(e)=>{desk.field('notes',e.nativeEvent)}}></textarea></label>
{s.error&&<><p role="alert" className="wide">{s.error}</p></>}
<div className="wide form-actions"><button type="submit" disabled={s.saving}>{s.saving?'Saving…':'Save record'}</button><a href="#board">Cancel</a></div></form></div></>}
{s.page==='guide'&&<><div className="inner"><p className="eyebrow">SCHOOL MOBILITY / PLAYBOOK</p><h1>Compare like-for-like observations</h1><article className="panel guide"><h2>Review checklist</h2><p>Use the same observation window on comparable school days. Separate access exceptions from ordinary through traffic and record weather or construction that could skew counts.</p><h2>Before closing a record</h2><p>Brief a result only once the observation window and a note on limitations are recorded.</p><a href="https://www.brussels.be/reper-vreven-school-quarter">Read the official background</a></article></div></>}
</main><footer className="wrap footer">School Street Trial Notebook <span>·</span> Sample workspace</footer></>
}
createRoot(document.getElementById('app')!).render(<App />)
