import logoImg from '../../assets/logo.svg'
import leftEffectHeader from '../../assets/leftEffectHeader.svg'
import rightEffectHeader from '../../assets/rightEffectHeader.svg'

export function Header() {
    return(
        <div className='h-72 flex justify-between items-center bg-baseProfile'>
            <img src={leftEffectHeader} alt="" />
            <img src={logoImg} alt="" />
            <img src={rightEffectHeader} alt="" />
        </div>
    )
}