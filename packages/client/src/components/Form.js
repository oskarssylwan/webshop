import { useState } from 'react'

export const useForm = (defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues)
  const resetForm = () => setValues(defaultValues)

  const setFormValue = event => {
    if (!event.target.name) return
    switch (event.target.type) {

    case 'file':
      setValues({
        ...values,
        [event.target.name]: {
          meta: event.target.value,
          files: event.target.files
        }
      })
      break

    default:
      setValues({
        ...values,
        [event.target.name]: event.target.value
      })
    }
  }

  return [values, setFormValue, resetForm]
}
