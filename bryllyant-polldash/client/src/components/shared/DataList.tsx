import * as React from 'react'

export type DataListProps<L> = {
  Component: React.FC<any>
  list: L[]
  children?: React.ReactNode
}

export type DataTitleProps = {
  text: string
}

export type DataIconProps = {
  classNames: string[]
  callback: (event: React.MouseEvent) => void
}

const DataTitle = ({ text }: DataTitleProps): React.ReactElement => (
  <h5 className="data-top">{text}</h5>
)

const DataIcon = ({ classNames, callback }: DataIconProps): React.ReactElement => (
  <i className={classNames.join(' ')} onClick={callback} />
)

export function DataList<L>({ Component, list }: DataListProps<L>): React.ReactElement {
  return (
    <div className="data-list">
      {list.map((item: L, i: number) => (
        <div key={i} className="data-item">
          <Component item={item} DataTitle={DataTitle} DataIcon={DataIcon} />
        </div>
      ))}
    </div>
  )
}
