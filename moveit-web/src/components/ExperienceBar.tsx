export function ExperienceBar() {
  return (
    <header className="experience-bar">
      <span>0 xp</span>
      <div>
        <div className="progress-bar" style={{ width: '60%' }}></div>
        <span className="current-progress" style={{ left: '60%' }}>
          350 xp
        </span>
      </div>
      <span></span>
    </header>
  )
}