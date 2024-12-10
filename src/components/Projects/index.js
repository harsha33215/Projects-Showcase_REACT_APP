import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import ProjectItems from '../ProjectItems'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {
    projectsData: [],
    filteredProjects: [],
    isLoading: true,
    selectedCategory: 'ALL',
    isError: false,
  }

  componentDidMount() {
    this.getAllProjects()
  }

  getAllProjects = async () => {
    const url = 'https://apis.ccbp.in/ps/projects?category=ALL'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.projects.map(eachData => ({
          id: eachData.id,
          name: eachData.name,
          imageUrl: eachData.image_url,
          category: eachData.category || 'ALL',
        }))
        this.setState({
          projectsData: formattedData,
          filteredProjects: formattedData,
          isLoading: false,
          isError: false,
        })
      } else {
        this.setState({isLoading: false, isError: true})
      }
    } catch {
      this.setState({isLoading: false, isError: true})
    }
  }

  handleCategoryChange = event => {
    const selectedCategory = event.target.value
    this.setState(prevState => ({
      selectedCategory,
      filteredProjects:
        selectedCategory === 'ALL'
          ? prevState.projectsData
          : prevState.projectsData.filter(
              project => project.category === selectedCategory,
            ),
    }))
  }

  renderLoadingView = () => (
    <div data-testid='loader' className='loader'>
      <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
    </div>
  )

  renderErrorView = () => (
    <div className='error-view'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-view-img.png'
        alt='failure view'
        className='error-image'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getAllProjects} className='retry-button'>
        Retry
      </button>
    </div>
  )

  render() {
    const {filteredProjects, isLoading, selectedCategory, isError} = this.state
    return (
      <div className='projects-container'>
        <Header />
        <div className='categories-dropdown'>
          <select
            id='categories'
            value={selectedCategory}
            onChange={this.handleCategoryChange}
            className='category-select'
          >
            {categoriesList.map(category => (
              <option key={category.id} value={category.id}>
                {category.displayText}
              </option>
            ))}
          </select>
        </div>

        <ul className='list-items-container'>
          {isLoading
            ? this.renderLoadingView()
            : isError
            ? this.renderErrorView()
            : filteredProjects.map(item => (
                <ProjectItems key={item.id} projectDetails={item} />
              ))}
        </ul>
      </div>
    )
  }
}

export default Projects
