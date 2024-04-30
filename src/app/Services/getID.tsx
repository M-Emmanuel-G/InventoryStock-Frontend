import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import localizedFormat from'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export abstract class DateGenerator {
    static dateNow = ()=>{
        return dayjs().locale("pt-br").format("L LT")
    }
}