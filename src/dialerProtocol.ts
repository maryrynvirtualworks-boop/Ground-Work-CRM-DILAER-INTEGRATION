import { DialerMode } from './types';

let dialerMode: DialerMode = (() => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('groundwork_crm_dialer_mode') : null;
  if (saved === 'desktop' || saved === 'popout_only' || saved === 'chrome' || saved === 'hybrid') {
    return saved as DialerMode;
  }
  return 'desktop';
})();

let globalCallState = {
  isCalling: false,
  activeLeadId: undefined as string | undefined,
  activePhoneNumber: undefined as string | undefined,
  startTime: undefined as number | undefined,
  startedAt: undefined as number | undefined,
};

export function getDialerMode(): DialerMode {
  return dialerMode;
}

export function setDialerMode(mode: DialerMode): void {
  dialerMode = mode;
  if (typeof window !== 'undefined') {
    localStorage.setItem('groundwork_crm_dialer_mode', mode);
    window.dispatchEvent(new CustomEvent('crm-dialer-mode-changed', { detail: mode }));
  }
}

export function getDialHref(phoneNumber?: string): string {
  if (!phoneNumber) return '';
  return "dialpad:" + phoneNumber;
}

/**
 * Immediately dispatches dialing protocol request using window.location="dialpad:" + number
 * Not number sensitive, sends directly
 */
export function triggerImmediateDial(phoneNumber?: string): void {
  if (!phoneNumber) return;
  const uri = "dialpad:" + phoneNumber;
  try {
    window.location.href = uri;
  } catch {
    (window as any).location = uri;
  }
}

export function getGlobalCallState() {
  return { ...globalCallState };
}

export function setGlobalCallState(state: Partial<typeof globalCallState>) {
  globalCallState = {
    ...globalCallState,
    ...state,
  };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crm-call-state-changed', { detail: globalCallState }));
  }
}

export function resetCallState() {
  globalCallState = {
    isCalling: false,
    activeLeadId: undefined,
    activePhoneNumber: undefined,
    startTime: undefined,
    startedAt: undefined,
  };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crm-call-state-changed', { detail: globalCallState }));
  }
}
