export const ADMIN_PAGE_TITLE = {
  STUDENT_MANAGEMENT: 'Quản lý thông tin sinh viên',
  SCORE_MANAGEMENT: 'Quản lý điểm sinh viên',
  CERTIFICATE_MANAGEMENT: 'Quản lý văn bằng, chứng chỉ',
  LECTURER_MANAGEMENT: 'Quản lý thông tin giảng viên',
  COURSE_MANAGEMENT: 'Quản lý môn học',
  CLASS_MANAGEMENT: 'Quản lý lớp học',
  FACULTY_MANAGEMENT: 'Quản lý khoa'
}

export const DETAIL_DIALOG_TITLE = {
  STUDENT_MANAGEMENT: 'Thông tin sinh viên',
  SCORE_MANAGEMENT: 'Điểm sinh viên',
  CERTIFICATE_MANAGEMENT: 'Văn bằng, chứng chỉ',
  LECTURER_MANAGEMENT: 'Thông tin giảng viên',
  COURSE_MANAGEMENT: 'Thông tin môn học',
  CLASS_MANAGEMENT: 'Thông tin lớp học',
  FACULTY_MANAGEMENT: 'Thông tin khoa'
}

export const FACULTY_LABEL_HEADER = {
  id: 'ID',
  code: 'Mã khoa',
  name: 'Tên khoa',
  trainingPeriod: 'Thời gian đào tạo'
}

export const GENDER_GROUPS = [
  {
    label: undefined,
    options: [
      {
        value: 'Nam',
        label: 'Nam'
      },
      {
        value: 'Nữ',
        label: 'Nữ'
      },
      {
        value: 'Khác',
        label: 'Khác'
      }
    ]
  }
]

export const MAJOR_GROUPS = [
  {
    label: 'Hệ dân sự',
    options: [
      {
        value: 'CNTT',
        label: 'Công nghệ thông tin'
      },
      {
        value: 'ATT',
        label: 'An toàn thông tin'
      },
      {
        value: 'DTVT',
        label: 'Điện tử viễn thông'
      }
    ]
  }
]

export const ETHNICITY_GROUPS = [
  {
    label: undefined,
    options: [
      { value: 'Ba Na', label: 'Ba Na' },
      { value: 'Bố Y', label: 'Bố Y' },
      { value: 'Brâu', label: 'Brâu' },
      { value: 'Bru - Vân Kiều', label: 'Bru - Vân Kiều' },
      { value: 'Chăm', label: 'Chăm' },
      { value: 'Chơ Ro', label: 'Chơ Ro' },
      { value: 'Chu Ru', label: 'Chu Ru' },
      { value: 'Chứt', label: 'Chứt' },
      { value: 'Co', label: 'Co' },
      { value: 'Cơ Ho', label: 'Cơ Ho' },
      { value: 'Cơ Lao', label: 'Cơ Lao' },
      { value: 'Cơ Tu', label: 'Cơ Tu' },
      { value: 'Cống', label: 'Cống' },
      { value: 'Dao', label: 'Dao' },
      { value: 'Ê Đê', label: 'Ê Đê' },
      { value: 'Gia Rai', label: 'Gia Rai' },
      { value: 'Giáy', label: 'Giáy' },
      { value: 'Giẻ Triêng', label: 'Giẻ Triêng' },
      { value: 'H Mông', label: 'H Mông' },
      { value: 'Hà Nhì', label: 'Hà Nhì' },
      { value: 'Hoa', label: 'Hoa' },
      { value: 'Hrê', label: 'Hrê' },
      { value: 'Khơ Me', label: 'Khơ Me' },
      { value: 'Khơ Mú', label: 'Khơ Mú' },
      { value: 'Kinh', label: 'Kinh' },
      { value: 'La Chí', label: 'La Chí' },
      { value: 'La Ha', label: 'La Ha' },
      { value: 'La Hủ', label: 'La Hủ' },
      { value: 'Lào', label: 'Lào' },
      { value: 'Lô Lô', label: 'Lô Lô' },
      { value: 'Lự', label: 'Lự' },
      { value: 'Mạ', label: 'Mạ' },
      { value: 'Mảng', label: 'Mảng' },
      { value: 'Mnông', label: 'Mnông' },
      { value: 'Mường', label: 'Mường' },
      { value: 'Ngái', label: 'Ngái' },
      { value: 'Nùng', label: 'Nùng' },
      { value: 'Ơ Đu', label: 'Ơ Đu' },
      { value: 'Pà Thẻn', label: 'Pà Thẻn' },
      { value: 'Phù Lá', label: 'Phù Lá' },
      { value: 'Phunoi', label: 'Phunoi' },
      { value: 'Pu Péo', label: 'Pu Péo' },
      { value: 'Ra Glai', label: 'Ra Glai' },
      { value: 'Rơ Măm', label: 'Rơ Măm' },
      { value: 'Sán Chay', label: 'Sán Chay' },
      { value: 'Sán Dìu', label: 'Sán Dìu' },
      { value: 'Si La', label: 'Si La' },
      { value: 'Tà Ôi', label: 'Tà Ôi' },
      { value: 'Tày', label: 'Tày' },
      { value: 'Thái', label: 'Thái' },
      { value: 'Thổ', label: 'Thổ' },
      { value: 'Xinh Mun', label: 'Xinh Mun' },
      { value: 'Xơ Đăng', label: 'Xơ Đăng' },
      { value: 'Xtiêng', label: 'Xtiêng' }
    ]
  }
]

export const STUDENT_LABEL = {
  id: 'ID',
  studentCode: 'mã sinh viên',
  fullName: 'tên sinh viên',
  personalEmail: 'email cá nhân',
  email: 'email học viện',
  ethnicity: 'dân tộc',
  gender: 'giới tính',
  major: 'ngành học',
  class: 'lớp',
  course: 'khóa',
  nationalId: 'số CMND',
  placeOfBirth: 'nơi sinh',
  dateOfBirth: 'ngày sinh',
  address: 'địa chỉ',
  phoneNumber: 'số điện thoại'
}

export const STUDENT_LABEL_HEADER = {
  id: 'ID',
  studentCode: 'Mã sinh viên',
  fullName: 'Tên sinh viên',
  personalEmail: 'Email cá nhân',
  email: 'Email học viện',
  ethnicity: 'Dân tộc',
  gender: 'Giới tính',
  major: 'Ngành học',
  class: 'Lớp',
  course: 'Khóa',
  nationalId: 'Số CMND',
  placeOfBirth: 'Nơi sinh',
  dateOfBirth: 'Ngày sinh',
  address: 'Địa chỉ',
  phoneNumber: 'Số điện thoại'
}

export const CLASS_LABEL = {
  id: 'ID',
  code: 'mã lớp',
  course: 'khóa',
  majorName: 'ngành học',
  majorCode: 'mã ngành học'
}

export const CLASS_LABEL_HEADER = {
  id: 'ID',
  code: 'Mã lớp',
  course: 'Khóa',
  majorName: 'Ngành học',
  majorCode: 'Mã ngành học'
}
