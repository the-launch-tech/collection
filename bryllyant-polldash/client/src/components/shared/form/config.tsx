import * as Formik from 'formik'

export type KeyValue = {
  [key: string]: any
}

export type FormFieldConfig = {
  width: number
  withCell: boolean
  type: string
  name: string
  inputPrefix?: (
    values: Formik.FormikValues,
    errors: Formik.FormikErrors<Formik.FormikValues>,
    name: string
  ) => JSX.Element
  placeholder?: string
  required: boolean | undefined
  showRequired?: boolean
  label: string | undefined
  showHide?: boolean
  fields?: FormFieldConfig[]
  options?: (string | { label: string; value: any })[]
}

export type FormActionsConfig = {
  withCell: boolean
  submitIcon?: string
  submitLabel: string
  cancelIcon?: string
  cancelLabel?: string
  nextIcon?: string
  nextLabel?: string
  previousIcon?: string
  previousLabel?: string
}

export type FormMessageConfig = {
  withCell: boolean
}

export type FormPageConfig = FormRowConfig[]

export type FormRowConfig = FormFieldConfig[]

export type FormConfig = {
  title?: string
  actions: FormActionsConfig
  message: FormMessageConfig
  fields?: FormRowConfig[]
  pages?: FormPageConfig[]
  isMultiPage?: boolean
  hasCancel?: boolean
  hasPrevious?: boolean
  pageMetas?: FormPageMeta[]
}

export type TemplateProps = {
  initialValues: KeyValue
  validate: (values: Formik.FormikValues) => Formik.FormikErrors<Formik.FormikValues>
  onSubmit: (values: any, helpers: Formik.FormikHelpers<any>) => Promise<void>
  formConfig: FormConfig
  formMessage: string | null
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  page: number
  onCancelForm?: (e: React.MouseEvent) => void
  onNextPage?: (e: React.MouseEvent) => void
  onPreviousPage?: (e: React.MouseEvent) => void
  onGoToPage?: PageTrackerProps['onGoToPage']
}

export type FormTitleProps = {
  title: string
}

export type FormContainerProps = {
  initialValues: KeyValue
  validate: (values: any) => Formik.FormikErrors<any>
  onSubmit: (values: any, helpers: Formik.FormikHelpers<any>) => Promise<void>
  formMessage: string | null
  render: (
    formikProps: Formik.FormikProps<Formik.FormikValues>,
    pageHasErrors: boolean[]
  ) => JSX.Element
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  formConfig: FormConfig
  page: number
}

export type FormMessageProps = FormMessageConfig & {
  message: string
}

export type FormRowProps = {
  classNames?: string
}

export type FormCellProps = {
  width: number
  classNames?: string
}

export type FormFieldProps = FormFieldConfig & {
  values: Formik.FormikValues
  errors: Formik.FormikErrors<Formik.FormikValues>
}

export type FormActionsProps = TemplateProps & {
  disabled: boolean
  maxPages: number
  values: Formik.FormikValues
  errors: Formik.FormikErrors<Formik.FormikValues>
  pageHasErrors: boolean[]
}

export type FieldRendererParams = {
  formConfig: FormConfig
  page: number
  values: Formik.FormikValues
  errors: Formik.FormikErrors<Formik.FormikValues>
}

export type FormPageMeta = {
  title?: string
  description?: string
  trackerRender?: (
    currentPage: number,
    onGoToPage: PageTrackerProps['onGoToPage'],
    pageHasErrors: boolean[]
  ) => JSX.Element
}

export type PageTrackerProps = {
  maxPages: number
  page: number
  pageMetas?: FormPageMeta[]
  onGoToPage?: (page: number) => void
  pageHasErrors: boolean[]
}

export type FormButtonProps = {
  type?: 'button' | 'submit'
  disabled: boolean
  btnClassName: string
  onAction?: (event: React.MouseEvent) => void
  iconLeft?: string
  iconRight?: string
  label?: string
}

export type RepeaterButtonProps = {
  action: string
  onClick: (event: React.MouseEvent) => void
}
