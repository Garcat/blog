import DateFormat from '@/types/DateFormat'
import { parseISO, differenceInDays, formatDistanceToNowStrict } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { FC } from 'react'

interface Props {
  children: string
  className?: string
  format?: DateFormat
}

const FormattedTime: FC<Props> = ({
  children,
  className = undefined,
  format = DateFormat.ISODate,
}) => {
  if (differenceInDays(new Date(children), new Date()) <= 3) {
    return (
      <time dateTime={children} className={className}>
        {formatDistanceToNowStrict(new Date(children), { addSuffix: true })}
      </time>
    )
  }

  return (
    <time dateTime={children} className={className}>
      {formatInTimeZone(parseISO(children), 'GMT', format)}
    </time>
  )
}

export default FormattedTime
