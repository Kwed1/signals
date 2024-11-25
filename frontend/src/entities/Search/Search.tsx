import seachIcon from 'assets/icons/search.svg';
import styles from './Search.module.scss';

interface SearchProps {
   value?: string;
   defaultValue?: string;
   placeholder?: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({
   onChange,
   defaultValue,
   placeholder = 'Search...',
   value,
}: SearchProps) {
   return (
      <div className={styles.search}>
         <img
            width={20}
            height={20}
            src={seachIcon}
            alt=''
         />
         <input
            className={styles.input}
            type='text'
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
         />
      </div>
   );
}
