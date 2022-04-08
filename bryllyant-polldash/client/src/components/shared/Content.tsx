import * as React from 'react'

export type ContentProps = {
  classNames?: string[]
  children: JSX.Element[] | JSX.Element
}

export const Content: React.FC<ContentProps> = (props: ContentProps): JSX.Element => {
  return (
    <div className={`content${props.classNames ? ' ' + props.classNames.join(' ') : ''}`}>
      {props.children}
    </div>
  )
}
