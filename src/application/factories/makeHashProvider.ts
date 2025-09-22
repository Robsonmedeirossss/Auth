import { HashProvider } from '../../infra/providers/HashProvider';

export function makeHashProvider(){
  return new HashProvider();
}
