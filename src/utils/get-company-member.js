import { find } from 'lodash'
import { company_member as companyMember } from '../../config'

const getCompanyMember = members => find(members, { username: companyMember })

export default getCompanyMember
