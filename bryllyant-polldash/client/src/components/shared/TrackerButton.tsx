import * as React from 'react'

import { PageTrackerProps } from './form/config'

export type TrackerButtonProps = {
  onGoToPage?: PageTrackerProps['onGoToPage']
  currentPage: number
  pageHasErrors: boolean[]
  icon: string
  page: number
  disabled: boolean
}

export const TrackerButton: React.FC<TrackerButtonProps> = (props): JSX.Element => {
  const isDisabled: boolean = !props.onGoToPage || props.disabled
  const isCurrent: boolean = props.currentPage === props.page
  const isIncomplete: boolean =
    props.pageHasErrors[props.page - 1] && props.currentPage !== props.page && !isDisabled

  return (
    <button
      type="button"
      className={`form-page-counter ${isCurrent ? 'active-page-counter' : ''} ${
        isIncomplete ? 'incomplete-page-counter' : ''
      }`}
      onClick={e => (props.onGoToPage ? props.onGoToPage(props.page) : undefined)}
      disabled={isDisabled}
    >
      <i className={`${props.icon} form-page-counter-icon`} />
    </button>
  )
}
