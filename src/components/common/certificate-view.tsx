interface Props {
  universityName: string
  universityCode: string
  facultyName: string
  facultyCode: string
  studentCode: string
  studentName: string
  name: string
  date: string
  certificateType: string
  signed: boolean
  serialNumber: string
  regNo: string
}

const CertificateView: React.FC<Props> = (props) => {
  return (
    <div>
      <ul>
        <li>
          <p>Trường đại học/Học viện</p>
          <span>
            {props.universityCode} - {props.universityName}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default CertificateView
