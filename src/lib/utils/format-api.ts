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
        status: data.status
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
