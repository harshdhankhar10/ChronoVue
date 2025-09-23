"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, X } from 'lucide-react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

interface AddMilestoneModalProps {
  showAddMilestone: boolean
  setShowAddMilestone: (show: boolean) => void
  timelineID: string
}

const AddMilestoneModal = ({ showAddMilestone, setShowAddMilestone, timelineID }: AddMilestoneModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [status, setStatus] = useState('NOT_STARTED')
  const [priority, setPriority] = useState('MEDIUM')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!showAddMilestone) return null

    const priorities = ['LOW', 'MEDIUM', 'HIGH'];
    const statuses = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];

    const handleAddTags  = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            e.preventDefault();
            setTags([...tags, e.currentTarget.value]);
            e.currentTarget.value = '';
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handleSubmit = async () => {
        if(title.trim() === '' || description.trim() === '' || !targetDate){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill all the required fields',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
          return
        }
        try {
          setLoading(true)
          const response = await axios.post('/api/dashboard/timelines/addMilestone', {
            title,
            description,
            targetDate,
            status,
            priority,
            tags,
            timelineID
          })
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text : response.data.message,
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
            })
            router.refresh()
            setShowAddMilestone(false)
            setTitle('')
            setDescription('')
            setTargetDate('')
            setStatus('NOT_STARTED')
            setPriority('MEDIUM')
            setTags([])
          }
        } catch (error:any) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'Something went wrong',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
        }finally{
          setLoading(false)
        }
        }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Milestone</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
            ></textarea>
          </div>
          
        <div className='flex justify-between gap-4'>
            <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <Input
              type="date"
              name="targetDate"
              id="targetDate"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>
        <div className='mt-4'>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
        </div>
        <div>
          <Input 
            type="text"
            placeholder="Add a tag and press Enter"
            onKeyDown={handleAddTags}
            className="mt-4"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center bg-gray-200 rounded-full px-2 py-1">
                <span className="text-sm text-gray-700 mr-2">{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant={'outline'}
            onClick={() => setShowAddMilestone(false)}
          >
            Cancel
          </Button>
          <Button className='bg-secondary hover:bg-secondary/90 text-white'
            onClick={handleSubmit} disabled={loading}
          >
            {loading ? <Loader className="animate-spin mr-2" size={16} /> : 'Add Milestone'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddMilestoneModal