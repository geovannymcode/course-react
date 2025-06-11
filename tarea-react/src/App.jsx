import TaskItem from './components/TaskItem'
import { tareas } from './data.js'

function App() {
  const tareas = [
    { id: 1, titulo: "Estudiar React", completado: false },
    { id: 2, titulo: "Hacer ejercicio", completado: true },
    { id: 3, titulo: "Leer documentación", completado: false },
    { id: 4, titulo: "Final", completado: false }
  ]

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