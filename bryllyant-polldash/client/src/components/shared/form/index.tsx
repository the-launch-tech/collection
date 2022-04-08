import * as React from 'react'
import {
  Formik,
  FormikProps,
  FormikErrors,
  FormikValues,
  FormikHelpers,
  Field,
  ErrorMessage,
  Form,
  FieldArray,
  FieldArrayRenderProps,
} from 'formik'

import {
  TemplateProps,
  FormTitleProps,
  FormContainerProps,
  FormMessageProps,
  FormRowProps,
  FormCellProps,
  FormActionsProps,
  FormFieldProps,
  PageTrackerProps,
  FieldRendererParams,
  FormRowConfig,
  FormFieldConfig,
  FormPageConfig,
  FormButtonProps,
  RepeaterButtonProps,
} from './config'

export const FormTitle: React.FC<FormTitleProps> = ({ title }): JSX.Element => {
  if (!title) {
    return <React.Fragment />
  }

  return (
    <div className="form-head">
      <h3 className="form-title">{title}</h3>
    </div>
  )
}

export const FormContainer: React.FC<FormContainerProps> = ({
  initialValues,
  validate,
  onSubmit,
  formMessage,
  render,
  maxWidth,
  formConfig,
  page,
}): JSX.Element => {
  return (
    <div className={`form-container max-w-${maxWidth}`}>
      <Formik<{ [name: string]: any }>
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {(formikProps: FormikProps<any>) => {
          const pageHasErrors: boolean[] = React.useMemo((): boolean[] => {
            if (!formConfig.pages) {
              return [false]
            }

            return formConfig.pages.map((page: any) => {
              return (
                page
                  .map((row: FormRowConfig): {
                    name: string
                    required: boolean
                  }[] =>
                    row.map((field: FormFieldConfig): { name: string; required: boolean } => ({
                      name: field.name,
                      required: field.required || false,
                    }))
                  )
                  .flat()
                  .map((field: { name: string; required: boolean }): boolean =>
                    formikProps.errors[field.name] ||
                    (!formikProps.values[field.name] && field.required)
                      ? true
                      : false
                  )
                  .filter(Boolean).length > 0
              )
            })
          }, [page, formikProps.errors, formikProps.values])

          return <Form>{render(formikProps, pageHasErrors)}</Form>
        }}
      </Formik>
    </div>
  )
}

export const FormRow: React.FC<FormRowProps> = ({ children, classNames }): JSX.Element => (
  <div className={`form-row ${classNames || ''}`}>{children}</div>
)

export const FormCell: React.FC<FormCellProps> = ({ children, width, classNames }): JSX.Element => (
  <div className={`form-cell w-${width} ${classNames || ''}`}>{children}</div>
)

export const FormInput: React.FC<FormFieldProps> = (props): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="form-field">
      {props.label && (
        <label className="form-field-label">
          {props.label}
          {props.required && props.showRequired && <sup className="form-required-note">*</sup>}
        </label>
      )}
      <div className="form-field-input-wrapper">
        {props.inputPrefix && props.inputPrefix(props.values, props.errors, props.name)}
        <Field
          className="form-field-input"
          type={props.type === 'password' && showPassword ? 'text' : props.type}
          name={props.name}
          placeholder={props.placeholder}
          required={props.required}
        />
        {props.showHide && (
          <i
            className={`fal fa-eye form-show-password-icon ${
              showPassword ? 'active-show-password' : ''
            }`}
            onClick={(e: React.MouseEvent): void => setShowPassword(prev => !prev)}
          />
        )}
      </div>
      <ErrorMessage className="form-field-error" name={props.name} component="div" />
    </div>
  )
}

export const FormSelect: React.FC<FormFieldProps> = (props): JSX.Element => (
  <div className="form-field">
    {props.label && (
      <label className="form-field-label">
        {props.label}
        {props.required && props.showRequired && <sup className="form-required-note">*</sup>}
      </label>
    )}
    <div className="form-field-input-wrapper">
      {props.inputPrefix && props.inputPrefix(props.values, props.errors, props.name)}
      <Field as="select" name={props.name} required={props.required} className="form-field-select">
        <option value={undefined}>Select A Value</option>
        {props.options &&
          props.options.map((option: string | { label: string; value: any }, i: number) => {
            if (typeof option === 'string') {
              return (
                <option key={i.toString()} value={option}>
                  {option}
                </option>
              )
            }
            return (
              <option key={i.toString()} value={option.value}>
                {option.label}
              </option>
            )
          })}
      </Field>
    </div>
    <ErrorMessage className="form-field-error" name={props.name} component="div" />
  </div>
)

export const FormCheckbox: React.FC<FormFieldProps> = (props): JSX.Element => (
  <div className="form-field">
    {props.label && (
      <label className="form-field-label">
        {props.label}
        {props.required && props.showRequired && <sup className="form-required-note">*</sup>}
      </label>
    )}
    <div className="form-field-input-wrapper">
      {props.inputPrefix && props.inputPrefix(props.values, props.errors, props.name)}
      {(props.options || []).map((option: string | { label: string; value: any }, i: number) => {
        if (typeof option === 'string') {
          return (
            <div key={i} className="form-field-checkbox-wrapper">
              <Field
                type="checkbox"
                name={Object.keys(option) ? props.name : ''}
                value={option}
                className="form-field-checkbox"
              />{' '}
              {option}
            </div>
          )
        } else {
          return (
            <div key={i} className="form-field-checkbox-wrapper">
              <Field
                type="checkbox"
                name={props.name}
                value={option.value}
                className="form-field-checkbox"
              />{' '}
              {option.label}
            </div>
          )
        }
      })}
    </div>
    <ErrorMessage className="form-field-error" name={props.name} component="div" />
  </div>
)

export const FormRadio: React.FC<FormFieldProps> = (props): JSX.Element => (
  <div className="form-field">
    {props.label && (
      <label className="form-field-label">
        {props.label}
        {props.required && props.showRequired && <sup className="form-required-note">*</sup>}
      </label>
    )}
    <div className="form-field-input-wrapper">
      {props.inputPrefix && props.inputPrefix(props.values, props.errors, props.name)}
      {(props.options || []).map((option: string | { label: string; value: any }, i: number) => {
        if (typeof option === 'string') {
          return (
            <div key={i} className="form-field-radio-wrapper">
              <Field
                type="radio"
                name={Object.keys(option) ? props.name : ''}
                value={option}
                className="form-field-radio"
              />{' '}
              {option}
            </div>
          )
        } else {
          return (
            <div key={i} className="form-field-radio-wrapper">
              <Field
                type="radio"
                name={props.name}
                value={option.value}
                className="form-field-radio"
              />{' '}
              {option.label}
            </div>
          )
        }
      })}
    </div>
    <ErrorMessage className="form-field-error" name={props.name} component="div" />
  </div>
)

export const FormRepeat: React.FC<FormFieldProps> = (props): JSX.Element => (
  <div className="form-field">
    {props.label && <label className="form-field-label">{props.label}</label>}
    <FieldArray
      name={props.name}
      render={({ remove, insert, push }: FieldArrayRenderProps): JSX.Element => {
        const initialValues: { [name: string]: any } = {}
        props.fields &&
          props.fields.map((field: FormFieldConfig): any => (initialValues[field.name] = ''))
        return (
          <div className="form-repeater-group">
            {props.values[props.name] && props.values[props.name].length > 0 ? (
              props.values[props.name].map(
                (row: { [name: string]: any }, r: number): JSX.Element => (
                  <FormRow key={r.toString()}>
                    {props.fields &&
                      props.fields.map(
                        (field: FormFieldConfig, f: number): JSX.Element => (
                          <FormField
                            key={f.toString()}
                            type={field.type}
                            name={`${props.name}.${r}.${field.name}`}
                            options={field.options}
                            values={props.values}
                            errors={props.errors}
                            width={field.width}
                            withCell={field.withCell}
                            placeholder={field.placeholder}
                            required={field.required}
                            showRequired={field.showRequired}
                            label={field.label}
                            showHide={field.showHide}
                            inputPrefix={field.inputPrefix}
                          />
                        )
                      )}
                    <RepeaterButton action="remove" onClick={(): void => remove(r)}>
                      <i className="fal fa-minus" />
                    </RepeaterButton>
                    <RepeaterButton action="insert" onClick={(): void => insert(r, initialValues)}>
                      <i className="fal fa-plus" />
                    </RepeaterButton>
                  </FormRow>
                )
              )
            ) : (
              <RepeaterButton action="push" onClick={(): void => push(initialValues)}>
                <i className="fal fa-plus" /> {props.name}
              </RepeaterButton>
            )}
          </div>
        )
      }}
    />
    <ErrorMessage className="form-field-error" name={props.name} component="div" />
  </div>
)

export const FormField: React.FC<FormFieldProps> = (props): JSX.Element => {
  let jsx = <FormInput {...props} />

  if (props.type === 'select') {
    jsx = <FormSelect {...props} />
  } else if (props.type === 'repeat') {
    jsx = <FormRepeat {...props} />
  } else if (props.type === 'checkbox') {
    jsx = <FormCheckbox {...props} />
  } else if (props.type === 'radio') {
    jsx = <FormRadio {...props} />
  }

  if (props.withCell) {
    return <FormCell width={props.width}>{jsx}</FormCell>
  }

  return jsx
}

export const RepeaterButton: React.FC<RepeaterButtonProps> = (props): JSX.Element => (
  <button type="button" className={`form-repeater-${props.action} btn`} onClick={props.onClick}>
    {props.children}
  </button>
)

export const FormButton: React.FC<FormButtonProps> = (props): JSX.Element => (
  <button
    type={props.type || 'button'}
    disabled={props.disabled}
    className={`form-${props.btnClassName} btn`}
    onClick={props.onAction ? props.onAction : undefined}
  >
    {props.iconLeft && <i className={props.iconLeft || ''} />}
    {props.label}
    {props.iconRight && <i className={props.iconRight || ''} />}
  </button>
)

export const FormActions: React.FC<FormActionsProps> = (props): JSX.Element => {
  const { actions } = props.formConfig

  const submit = (
    <FormButton
      type="submit"
      disabled={props.disabled || !!Object.keys(props.errors).length}
      btnClassName="submit"
      iconRight={actions.submitIcon || 'fal fa-check'}
      label={actions.submitLabel || 'Submit'}
    />
  )

  const cancel = (
    <FormButton
      type="button"
      disabled={props.disabled}
      btnClassName="cancel"
      iconLeft={actions.cancelIcon || 'fal fa-undo'}
      label={actions.cancelLabel || 'Cancel'}
      onAction={props.onCancelForm}
    />
  )

  const next = (
    <FormButton
      type="button"
      disabled={props.disabled || props.pageHasErrors[props.page - 1]}
      btnClassName="next"
      iconRight={actions.nextIcon || 'fal fa-arrow-right'}
      label={actions.nextLabel || 'Next'}
      onAction={props.onNextPage}
    />
  )

  const previous = (
    <FormButton
      type="button"
      disabled={props.disabled}
      btnClassName="previous"
      iconLeft={actions.previousIcon || 'fal fa-arrow-left'}
      label={actions.previousLabel || 'Previous'}
      onAction={props.onPreviousPage}
    />
  )

  if (!props.formConfig.isMultiPage) {
    if (props.formConfig.hasCancel) {
      return (
        <FormRow classNames="form-action-row">
          {actions.withCell ? (
            <FormCell width={50} classNames="form-action-cell-start">
              {cancel}
            </FormCell>
          ) : (
            cancel
          )}
          {actions.withCell ? (
            <FormCell width={50} classNames="form-action-cell-end">
              {submit}
            </FormCell>
          ) : (
            submit
          )}
        </FormRow>
      )
    }
    return (
      <FormRow classNames="form-action-row">
        {actions.withCell ? (
          <FormCell width={100} classNames="form-action-cell-end">
            {submit}
          </FormCell>
        ) : (
          submit
        )}
      </FormRow>
    )
  }

  if (props.page === props.maxPages) {
    if (props.formConfig.hasCancel) {
      return (
        <FormRow classNames="form-action-row">
          {props.page > 1 &&
            (actions.withCell ? (
              <FormCell width={25} classNames="form-action-cell-start">
                {previous}
              </FormCell>
            ) : (
              previous
            ))}
          {actions.withCell ? (
            <FormCell width={props.page > 1 ? 25 : 50} classNames="form-action-cell-start">
              {cancel}
            </FormCell>
          ) : (
            cancel
          )}
          {actions.withCell ? (
            <FormCell width={50} classNames="form-action-cell-end">
              {submit}
            </FormCell>
          ) : (
            submit
          )}
        </FormRow>
      )
    }
    return (
      <FormRow classNames="form-action-row">
        {props.page > 1 &&
          (actions.withCell ? (
            <FormCell width={50} classNames="form-action-cell-start">
              {previous}
            </FormCell>
          ) : (
            previous
          ))}
        {actions.withCell ? (
          <FormCell width={props.page > 1 ? 50 : 100} classNames="form-action-cell-end">
            {submit}
          </FormCell>
        ) : (
          submit
        )}
      </FormRow>
    )
  }

  if (props.formConfig.hasPrevious) {
    return (
      <FormRow classNames="form-action-row">
        {props.page > 1 &&
          (actions.withCell ? (
            <FormCell width={50} classNames="form-action-cell-start">
              {previous}
            </FormCell>
          ) : (
            previous
          ))}
        {actions.withCell && props.page < props.maxPages ? (
          <FormCell width={props.page > 1 ? 50 : 100} classNames="form-action-cell-end">
            {next}
          </FormCell>
        ) : (
          next
        )}
      </FormRow>
    )
  }
  return (
    <FormRow classNames="form-action-row">
      {actions.withCell && props.page < props.maxPages ? (
        <FormCell width={100} classNames="form-action-cell-end">
          {next}
        </FormCell>
      ) : (
        next
      )}
    </FormRow>
  )
}

export const FormMessage: React.FC<FormMessageProps> = ({ withCell, message }): JSX.Element => {
  const jsx = (
    <div className="form-foot">
      <p className="form-message">{message}</p>
    </div>
  )

  if (withCell) {
    return <FormCell width={100}>{jsx}</FormCell>
  }

  return jsx
}

export function fieldRenderer(params: FieldRendererParams): JSX.Element[] {
  let formPage: FormPageConfig = []

  if (!params.formConfig.isMultiPage && Array.isArray(params.formConfig.fields)) {
    formPage = params.formConfig.fields
  } else if (params.formConfig.isMultiPage && Array.isArray(params.formConfig.pages)) {
    formPage = params.formConfig.pages[params.page ? params.page - 1 : 0]
  }

  if (!formPage || !Array.isArray(formPage)) {
    throw new Error('Invalid config, check your fields or pages object!')
  }

  return formPage.map((row: FormRowConfig, r: number) => (
    <FormRow key={r.toString()}>
      {row.map((field: FormFieldConfig, f: number) => (
        <FormField
          key={f.toString()}
          width={field.width}
          withCell={field.withCell}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          showRequired={field.showRequired}
          label={field.label}
          showHide={field.showHide}
          values={params.values}
          errors={params.errors}
          fields={field.fields}
          options={field.options}
          inputPrefix={field.inputPrefix}
        />
      ))}
    </FormRow>
  ))
}

export const PageTracker: React.FC<PageTrackerProps> = (props): JSX.Element => (
  <div className="form-meta">
    {props.pageMetas && (
      <div className="form-page-sub-header">
        {props.pageMetas[props.page - 1].title && (
          <h5 className="form-page-sub-title">{props.pageMetas[props.page - 1].title}</h5>
        )}
        {props.pageMetas[props.page - 1].description && (
          <p className="form-page-sub-description">{props.pageMetas[props.page - 1].description}</p>
        )}
      </div>
    )}
    <div className="form-page-tracker">
      {(props.pageMetas ? props.pageMetas : [...Array(props.maxPages)]).map((meta, i) => {
        if (meta.trackerRender) {
          return meta.trackerRender(props.page, props.onGoToPage, props.pageHasErrors)
        }

        return (
          <span
            key={i.toString()}
            className={`form-page-counter ${props.page === i + 1 ? 'active-page-counter' : ''}`}
            onClick={(e: React.MouseEvent): void =>
              props.page !== i + 1 && props.onGoToPage ? props.onGoToPage(i + 1) : undefined
            }
          >
            {i + 1}
          </span>
        )
      })}
    </div>
  </div>
)

export const FormTemplate: React.FC<TemplateProps> = (props): JSX.Element => {
  let maxPages = 1

  if (props.formConfig.pages) {
    maxPages = props.formConfig.pages.length
  }

  return (
    <FormContainer
      maxWidth={props.maxWidth}
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.onSubmit}
      formMessage={props.formMessage}
      formConfig={props.formConfig}
      page={props.page}
      render={(formikProps: FormikProps<any>, pageHasErrors: boolean[]) => (
        <React.Fragment>
          {!!props.formConfig.title && <FormTitle title={props.formConfig.title} />}
          {maxPages && maxPages > 1 && (
            <PageTracker
              page={props.page}
              maxPages={maxPages}
              pageMetas={props.formConfig.pageMetas}
              onGoToPage={props.onGoToPage}
              pageHasErrors={pageHasErrors}
            />
          )}
          {fieldRenderer({
            formConfig: props.formConfig,
            page: props.page,
            values: formikProps.values,
            errors: formikProps.errors,
          })}
          <FormActions
            {...props}
            disabled={formikProps.isSubmitting}
            maxPages={maxPages}
            values={formikProps.values}
            errors={formikProps.errors}
            pageHasErrors={pageHasErrors}
          />
          {!!props.formMessage && (
            <FormMessage withCell={props.formConfig.message.withCell} message={props.formMessage} />
          )}
        </React.Fragment>
      )}
    />
  )
}
FormTemplate.defaultProps = {
  formConfig: {
    isMultiPage: false,
    hasCancel: false,
    hasPrevious: false,
    pages: [],
    fields: [],
    message: {
      withCell: true,
    },
    actions: {
      withCell: true,
      submitIcon: 'fal fa-plane',
      submitLabel: 'Submit',
    },
  },
  maxWidth: 'lg',
  page: 1,
}
