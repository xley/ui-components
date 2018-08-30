import styled, { css, keyframes } from 'styled-components'
import { Variables } from '../../../common'

export interface ICircleSkeletonWrapperProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}

const progress = keyframes`
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
`

export const CircleSkeletonWrapper = styled.span`
  animation: ${progress} 1.2s ease-in-out infinite;
  background-color: ${Variables.Color.n200};
  background-image: linear-gradient(90deg, ${Variables.Color.n200}, ${Variables.Color.n300}, ${Variables.Color.n200});
  background-repeat: no-repeat;
  background-size: 200px 100%;
  border: 1px solid ${Variables.Color.n200};
  border-radius: 50%;
  display: inline-flex;
  line-height: 1rem;

  ${(props: ICircleSkeletonWrapperProps) => {
    switch (props.size) {
      case 'small':
        return css`
          height: 30px;
          width: 30px;
        `
      case 'medium':
        return css`
          height: 40px;
          width: 40px;
        `
      case 'large':
        return css`
          height: 72px;
          width: 72px;
        `
      case 'xlarge':
        return css`
          height: 120px;
          width: 120px;
        `
    }
  }}
`
