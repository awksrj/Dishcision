/**
 * Interactive Sign In Component
 * Wraps the Figma UI component with backend integration
 */

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import svgPaths from '../../imports/svg-ow3kzxvodw';
import imgLogo from 'figma:asset/92375b66cc5f6db228cbba4fabc2bd6032c970de.png';

type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = '' }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Time({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[21px] left-[21px] top-[12px] w-[54px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 21">
        <g id="Time">
          <g id="9:41">{children}</g>
        </g>
      </svg>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 h-[34px] left-1/2 w-[375px]">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8px] h-[5px] left-[calc(50%+0.5px)] rounded-[100px] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function SignInInteractive() {
  const { signIn, signInWithProvider, isLoading, error, validateEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleContinue = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    const success = await signIn(email);

    if (success) {
      console.log('Sign in successful!');
      // Navigate to home or dashboard
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithProvider('google');
  };

  const handleAppleSignIn = async () => {
    await signInWithProvider('apple');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="bg-[#40434e] relative size-full" data-name="Sign In">
      <HomeIndicator />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C2D3D] mx-auto mb-4"></div>
            <p className="text-gray-700">Signing in...</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute top-20 left-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-top">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[24px] items-center left-1/2 px-[24px] top-[calc(50%+3px)]" data-name="Content">
        <div className="content-stretch flex flex-col gap-[2px] items-center leading-[1.5] not-italic relative shrink-0 text-[#fffffa] text-center" data-name="Copy">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[16px]">Create an account</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[14px]">Enter your email to sign up for this app</p>
        </div>

        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[327px]" data-name="Input + Button">
          {/* Email Input Field */}
          <div className={`bg-white h-[40px] relative rounded-[8px] shrink-0 w-full transition-all ${isFocused ? 'ring-2 ring-[#7C2D3D]' : ''} ${emailError ? 'ring-2 ring-red-500' : ''}`} data-name="Field">
            <div aria-hidden="true" className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyPress={handleKeyPress}
                  placeholder="email@domain.com"
                  className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px not-italic overflow-hidden relative text-[#000] text-[14px] text-ellipsis whitespace-nowrap bg-transparent border-none outline-none placeholder:text-[#828282]"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Email Error */}
          {emailError && <p className="text-red-500 text-xs -mt-3">{emailError}</p>}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="bg-black h-[40px] relative rounded-[8px] shrink-0 w-full hover:bg-[#333] active:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-name="Button"
          >
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                  <p className="leading-[1.4]">Continue</p>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-[327px]" data-name="Divider">
          <div className="bg-[#e6e6e6] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Divider" />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#fffffa] text-[14px] text-center">or</p>
          <div className="bg-[#e6e6e6] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Divider" />
        </div>

        {/* OAuth Buttons */}
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Buttons">
          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="bg-[#eee] col-1 h-[40px] ml-0 mt-0 relative rounded-[8px] row-1 w-[327px] hover:bg-[#ddd] active:bg-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-name="Button"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[calc(50%+0.5px)] top-1/2" data-name="Label">
              <Wrapper additionalClassNames="relative shrink-0 size-[20px]">
                <g clipPath="url(#clip0_1_280)" id="Logo">
                  <path d={svgPaths.p33b7ccc0} fill="var(--fill-0, #4285F4)" id="Vector" />
                  <path d={svgPaths.p15123a40} fill="var(--fill-0, #34A853)" id="Vector_2" />
                  <path d={svgPaths.p28bf8e80} fill="var(--fill-0, #FBBC05)" id="Vector_3" />
                  <path d={svgPaths.p1e563600} fill="var(--fill-0, #EB4335)" id="Vector_4" />
                </g>
                <defs>
                  <clipPath id="clip0_1_280">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </Wrapper>
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p className="leading-[1.4]">Continue with Google</p>
              </div>
            </div>
          </button>

          {/* Apple Button */}
          <button
            onClick={handleAppleSignIn}
            disabled={isLoading}
            className="bg-[#eee] col-1 h-[40px] ml-0 mt-[48px] relative rounded-[8px] row-1 w-[327px] hover:bg-[#ddd] active:bg-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-name="Button"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[calc(50%+0.5px)] top-1/2" data-name="Label">
              <div className="relative shrink-0 size-[20px]" data-name="Logo">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-[-28.84%] max-w-none size-[158.73%] top-[-29.1%]" src={imgLogo} />
                </div>
              </div>
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p className="leading-[1.4]">Continue with Apple</p>
              </div>
            </div>
          </button>
        </div>

        {/* Terms */}
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#fffffa] text-[0px] text-[12px] text-center w-[min-content] whitespace-pre-wrap">
          <span className="leading-[1.5]">{`By clicking continue, you agree to our `}</span>
          <span className="leading-[1.5] text-[#828282]">Terms of Service</span>
          <span className="leading-[1.5]">{` and `}</span>
          <span className="leading-[1.5] text-[#828282]">Privacy Policy</span>
        </p>
      </div>

      {/* Status Bar */}
      <div className="absolute h-[44px] left-0 overflow-clip top-0 w-[375px]" data-name="Status Bar">
        <div className="absolute h-[11.336px] right-[14.67px] top-[17.33px] w-[66.661px]" data-name="Right Side">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.6614 11.336">
            <g id="Right Side">
              <g id="Battery">
                <path d={svgPaths.p21e39200} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
                <path d={svgPaths.p3aa28980} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
                <path d={svgPaths.p5ab6380} fill="var(--fill-0, black)" id="Rectangle_2" />
              </g>
              <path d={svgPaths.p359c6900} fill="var(--fill-0, black)" id="Wifi" />
              <path d={svgPaths.p202a9200} fill="var(--fill-0, black)" id="Mobile Signal" />
            </g>
          </svg>
        </div>
        <div className="absolute contents left-[21px] top-[12px]" data-name="Left Side">
          <Time>
            <path d={svgPaths.p24372f50} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3aa84e00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2e6b3780} fill="var(--fill-0, black)" />
            <path d={svgPaths.p12b0b900} fill="var(--fill-0, black)" />
          </Time>
        </div>
        <div className="absolute bg-[#702632] h-[44px] left-0 overflow-clip top-0 w-[375px]" data-name="Status Bar">
          <div className="absolute h-[11.336px] right-[14.67px] top-[17.33px] w-[66.661px]" data-name="Right Side">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.6612 11.3363">
              <g id="Right Side">
                <g id="Battery">
                  <path d={svgPaths.p28544f80} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, black)" />
                  <path d={svgPaths.pb4bbfc0} fill="var(--fill-0, black)" id="Combined Shape" opacity="0.4" />
                  <path d={svgPaths.pb193780} fill="var(--fill-0, black)" id="Rectangle_2" />
                </g>
                <path d={svgPaths.p3274ccb0} fill="var(--fill-0, black)" id="Wifi" />
                <path d={svgPaths.p2458ec80} fill="var(--fill-0, black)" id="Mobile Signal" />
              </g>
            </svg>
          </div>
          <div className="absolute contents left-[21px] top-[12px]" data-name="Left Side">
            <Time>
              <path d={svgPaths.p3de63e00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p3029a300} fill="var(--fill-0, black)" />
              <path d={svgPaths.p2e0c43c0} fill="var(--fill-0, black)" />
              <path d={svgPaths.p38350600} fill="var(--fill-0, black)" />
            </Time>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="absolute backdrop-blur-[10px] bg-[#702632] h-[78px] left-0 top-[739px] w-[375px]" data-name="Tab Bar">
        <div aria-hidden="true" className="absolute border-[#40434e] border-solid border-t inset-[-0.5px_0_0_0] pointer-events-none shadow-[0px_-0.5px_0px_0px_rgba(0,0,0,0.1)]" />
        <div className="absolute h-[44px] left-0 overflow-clip right-0 top-0" data-name="Tabs">
          <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%-149.5px)] opacity-30 pb-[8px] pt-[12px] px-[26px] top-0" data-name="Tab Bar Item">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Home">
              <div className="absolute inset-[11.15%_8.33%_14.28%_8.33%]" data-name="home">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17.8973">
                  <path clipRule="evenodd" d={svgPaths.p3bc78d00} fill="var(--fill-0, #FFFFFA)" fillRule="evenodd" id="home" />
                </svg>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%-74.5px)] opacity-30 pb-[8px] pt-[12px] px-[26px] top-0" data-name="Tab Bar Item">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="star">
              <div className="absolute inset-[12.5%_8.33%_8.33%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
                  <path d={svgPaths.p33d87f00} fill="var(--fill-0, #FFFFFA)" id="icon" />
                </svg>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%+0.5px)] opacity-30 pb-[8px] pt-[12px] px-[26px] top-0" data-name="Tab Bar Item">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="add_circle">
              <Wrapper additionalClassNames="absolute inset-[8.33%]">
                <path d={svgPaths.pfdc7880} fill="var(--fill-0, #FFFFFA)" id="icon" />
              </Wrapper>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%+75.5px)] opacity-30 pb-[8px] pt-[12px] px-[26px] top-0" data-name="Tab Bar Item">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Heart">
              <div className="absolute inset-[14.38%_8.33%_10.22%_8.33%]" data-name="heart">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18.0954">
                  <path d={svgPaths.p3990800} fill="var(--fill-0, #FFFFFA)" id="heart" />
                </svg>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%+150.5px)] pb-[8px] pt-[12px] px-[26px] top-0" data-name="Tab Bar Item">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Person">
              <div className="absolute inset-[8.33%_14.58%_6.25%_14.58%]" data-name="person">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 20.5">
                  <path d={svgPaths.p10d2bd00} fill="var(--fill-0, #FFFFFA)" id="person" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <HomeIndicator />
      </div>

      {/* Header */}
      <div className="absolute h-[125px] left-0 top-[44px] w-[375px]">
        <div className="absolute inset-[-24%_-16%_-72%_-16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 495 245">
            <g filter="url(#filter0_d_1_216)" id="Group 45">
              <rect fill="var(--fill-0, white)" height="32" id="Rectangle 28" rx="15" width="30" x="85" y="61" />
              <path d={svgPaths.p12532400} fill="var(--fill-0, #702632)" id="Rectangle 39" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="245" id="filter0_d_1_216" width="495" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="30" />
                <feGaussianBlur stdDeviation="30" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_216" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_216" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] left-[187.5px] not-italic text-[24px] text-center text-white top-[92px] tracking-[-0.24px] w-[141px]">
        <p className="leading-[32px] whitespace-pre-wrap">Log In</p>
      </div>

      {/* Back Button */}
      <div className="absolute contents left-[23px] top-[75px]">
        <div className="absolute bg-white h-[32px] left-[23px] rounded-[100px] top-[75px] w-[30px]" />
        <div className="absolute inset-[9.98%_89.07%_87.56%_8.27%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 20">
            <g id="Group 28">
              <path d={svgPaths.pb6b5f00} fill="var(--fill-0, black)" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
