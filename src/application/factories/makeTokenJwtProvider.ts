import { TokenJwtProvider } from "../../infra/providers/TokenJwtProvider";

export function makeTokenJwtProvider(){
  return new TokenJwtProvider();
}
