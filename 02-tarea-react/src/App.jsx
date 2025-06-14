import TaskItem from './components/TaskItem.jsx'
import { tareas } from './data.js'

function App() {
  return (
    <div>
      <h1>📝 Lista de Tareas</h1>
      <ul>
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            titulo={tarea.titulo}
            completado={tarea.completado}
          />
        ))}
      </ul>
    </div>
  )
}

export default App