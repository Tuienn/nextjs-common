import dayjs from 'dayjs'

export const formatStudent = (item: any, isSendToServer: boolean = false) => {
  if (isSendToServer) {
    return {
      student_id: item.studentCode,
      full_name: item.fullName,
      gender: item.gender,
      email: item.email,
      faculty_code: item.major,
      class_code: item.class,
      course: item.course,
      place_of_birth: item.placeOfBirth,
      date_of_birth: dayjs(item.dateOfBirth, 'MM-DD-YYYY').format('DD/MM/YYYY'),
      address: item.address,
      phone_number: item.phoneNumber,
      ethnicity: item.ethnicity,
      national_id: item.nationalId
    }
  } else {
    return {
      id: item.id,
      studentCode: item.student_id,
      fullName: item.full_name,
      gender: item.gender,
      email: item.email,
      major: item.faculty_code,
      class: item.class_code,
      course: item.course,
      placeOfBirth: item.place_of_birth,
      dateOfBirth: item.date_of_birth,
      address: item.address,
      phoneNumber: item.phone_number,
      ethnicity: item.ethnicity,
      nationalId: item.national_id,
      classCode: item.class_code
    }
  }
}

export const formatFacultyOptions = (data: any) => {
  return data.map((item: any) => ({
    label: item.name,
    value: item.code
  }))
}

export const formatFaculty = (item: any, isSendToServer: boolean = false) => {
  if (isSendToServer) {
    return {
      code: item.code,
      name: item.name,
      training_period: item.trainingPeriod + ' năm'
    }
  } else {
    return {
      id: item.id,
      code: item.code,
      name: item.name,
      trainingPeriod: Number(item.training_period.split(' ')[0])
    }
  }
}

export const formatClass = (item: any, isSendToServer: boolean = false) => {
  if (isSendToServer) {
    return {
      code: item.code,
      course: item.course,
      faculty_id: item.majorId
    }
  } else {
    return {
      id: item.id,
      code: item.code,
      course: item.course,
      majorCode: item.faculty_code,
      majorName: item.faculty_name,
      majorId: item.faculty_id
    }
  }
}

export const formatSubject = (item: any, isSendToServer: boolean = false) => {
  if (isSendToServer) {
    return {
      code: item.code,
      name: item.name,
      credit: Number(item.credit),
      faculty_id: item.majorId,
      description: item.description
    }
  } else {
    return {
      id: item.id,
      code: item.code,
      name: item.name,
      credit: item.credit,
      majorCode: item.faculty_code,
      majorName: item.faculty_name,
      majorId: item.faculty_id,
      description: item.description
    }
  }
}
