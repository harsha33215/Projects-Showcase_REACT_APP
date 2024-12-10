import './index.css'

const ProjectItems = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="list-container">
      <img className="image" src={imageUrl} alt={name} />
      <div>
        <p className="name">{name}</p>
      </div>
    </li>
  )
}
export default ProjectItems
