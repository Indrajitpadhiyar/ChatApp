import React, { useContext } from 'react'
import { UserContext } from '../context/User.context'
import { useState } from 'react'
import axios from "../config/axios"

const Home = () => {
  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState("")

  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });

    axios.post("/projects/create",
      {
        name: projectName,

      }).then((res) => {
        console.log(res);
        setIsModalOpen(false);
      }).catch((err) => {
        console.error(err);
      })
  }

  return (
    <main className='p-4'>

      <div className='projects'>
        <button
          onClick={() => setIsModalOpen(true)}
          className="project px-4 border-dashed border-2 border-gray-400 rounded-lg flex py-4 items-center justify-center gap-2 hover:bg-gray-100 transition">
          <i className="ri-link"></i>
          <span className='text-sm '>Create New Project</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
            <form
              onSubmit={createProject}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                onChange={e => setProjectName(e.target.value)}
                value={projectName || ""}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>

  )
}

export default Home
