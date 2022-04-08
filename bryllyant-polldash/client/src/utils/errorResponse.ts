import { AxiosError } from 'axios'

export default function(err: AxiosError): { message: string } {
  if (!!err.response) {
    return { message: err.response.data.message }
  }

  return { message: 'Server Error!' }
}
