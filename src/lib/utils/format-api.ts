import { format } from 'date-fns'

export const formatStudent = (data: any, isSendToServer: boolean = false) => {
  return isSendToServer
    ? {
        student_code: data.code,
        full_name: data.name,
        email: data.email,
        faculty_code: data.faculty,
        course: String(data.year ?? '')
      }
    : {
        id: data.id,
        code: data.student_code,
        name: data.full_name,
        email: data.email,
        faculty: data.faculty_code,
        facultyName: data.faculty_name,
        year: data.course,
        status: String(data.status)
      }
}

export const formatFaculty = (data: any, isSendToServer: boolean = false) => {
  return isSendToServer
    ? {
        faculty_code: data.code,
        faculty_name: data.name
      }
    : {
        id: data.id,
        code: data.faculty_code,
        name: data.faculty_name
      }
}

export const formatFacultyOptions = (data: any) => {
  return data.map((item: any) => ({
    label: item.name,
    value: item.code
  }))
}

export const formatCertificate = (data: any, isSendToServer: boolean = false) => {
  return isSendToServer
    ? {
        student_code: data.studentCode,
        name: data.name,
        certificate_type: data.certificateType,
        serial_number: data.serialNumber,
        reg_no: data.regNo
      }
    : {
        id: data.id,
        studentCode: data.student_code,
        studentName: data.student_name,
        faculty: data.faculty_code,
        facultyName: data.faculty_name,
        certificateType: data.certificate_type,
        date: format(new Date(data.created_at), 'dd/MM/yyyy HH:mm:ss'),
        signed: data.signed,
        name: data.name
      }
}

export const formatCertificateView = (data: any) => {
  return {
    studentCode: data.student_code,
    studentName: data.student_name,
    facultyCode: data.faculty_code,
    facultyName: data.faculty_name,
    certificateType: data.certificate_type,
    date: format(new Date(data.created_at), 'dd/MM/yyyy HH:mm:ss'),
    name: data.name,
    universityName: data.university_name,
    universityCode: data.university_code,
    serialNumber: data.serial_number,
    regNo: data.reg_no,
    signed: data.signed
  }
}

export const formatCertificateVerifyCode = (data: any, isSendToServer: boolean = false) => {
  return isSendToServer
    ? {
        duration_minutes: data.expiredAfter,
        can_view_score: data.permissionType.includes('can_view_score'),
        can_view_data: data.permissionType.includes('can_view_data'),
        can_view_file: data.permissionType.includes('can_view_file')
      }
    : {
        verifyCode: data.code,
        createdAt: format(new Date(data.created_at), 'dd/MM/yyyy HH:mm:ss'),
        expiredAfter: data.expired_in_minutes,
        permissionType: [
          data.can_view_score ? 'can_view_score' : null,
          data.can_view_data ? 'can_view_data' : null,
          data.can_view_file ? 'can_view_file' : null
        ].filter(Boolean) as ('can_view_score' | 'can_view_data' | 'can_view_file')[],
        status: data.expired_in_minutes !== 0
      }
}
