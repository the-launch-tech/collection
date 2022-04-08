import * as React from 'react'

export type InputPrefixProps = {
  errored: boolean
  icon: string
}

export const InputPrefix: React.FC<InputPrefixProps> = (props): JSX.Element => (
  <i
    className={`${props.icon} form-prefix-icon ${
      props.errored ? 'form-prefix-errored' : 'form-prefix-success'
    }`}
  />
)
