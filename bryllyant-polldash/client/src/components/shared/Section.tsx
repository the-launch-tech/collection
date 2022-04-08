import * as React from 'react'

export type SectionProps = {
  classNames?: string[]
  backgroundColor?: string
  minHeight?: number | string
  children: JSX.Element[] | JSX.Element
}

export const Section: React.FC<SectionProps> = (props: SectionProps): JSX.Element => {
  const style: React.CSSProperties = {}

  if (!!props.backgroundColor) {
    style['backgroundColor'] = props.backgroundColor
  }
  if (!!props.minHeight) {
    style['minHeight'] = props.minHeight
  }

  return (
    <section
      className={`section${props.classNames ? ' ' + props.classNames.join(' ') : ''}`}
      style={style}
    >
      {props.children}
    </section>
  )
}
