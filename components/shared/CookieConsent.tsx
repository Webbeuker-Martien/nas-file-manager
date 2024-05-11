'use client'

import React, { useEffect, useState } from "react";
import { encryptData, decryptData } from "@/lib/helpers/EncryptionHelper";
import { useTranslations } from "next-intl";
// import Toggle from "./forms/Toggle";
import useLocalStorage from "@/lib/hooks/use-local-storage";

type Props = {
    position?: 'left' | 'right',
}

type GtagOptions = {
    [key: string]: string
}
type Preferences = {
    [key: string]: {
        name: string,
        label: string
        value: 'granted' | 'denied'
    }
};
type PreferenceGroups = {
    [key: string]: {
        name: string,
        label: string
        disabled: boolean
        value: 'granted' | 'denied'
        preferences: Preferences
    }
};

const CookieConsent = ({ position = 'right' }: Props) => {

    const [cookieConsentOpen, setCookieConsentOpen] = useState(false);
    const [cookieConsentStep, setCookieConsentStep] = useState(0);

    const [preferenceGroups, setPreferenceGroups] = useState<PreferenceGroups>({})
    const [groupsLoaded, setGroupsLoaded] = useState(false);

    const t = useTranslations();

    const adsDefault = 'denied'
    const analyticsDefault = 'denied'
    const functionalityDefault = 'granted'
    const personalizationDefault = 'denied'
    const securityDefault = 'granted'

    const defaultPreferenceGroups: PreferenceGroups = {
        functionality: {
            name: 'functionality',
            label: 'functionality',
            disabled: true,
            value: functionalityDefault,
            preferences: {
                functionality_storage: {
                    value: functionalityDefault,
                    name: 'functionality_storage',
                    label: 'Functional Storage',
                }
            }
        },
        security: {
            name: 'security',
            label: 'security',
            disabled: true,
            value: securityDefault,
            preferences: {
                security_storage: {
                    value: securityDefault,
                    name: 'security_storage',
                    label: 'Security Storage',
                }
            }
        },
        advertisement: {
            name: 'advertisement',
            label: 'advertisement',
            disabled: false,
            value: adsDefault,
            preferences: {
                ad_storage: {
                    value: adsDefault,
                    name: 'ad_storage',
                    label: 'Google Ads Storage',
                },
                ad_user_data: {
                    value: adsDefault,
                    name: 'ad_user_data',
                    label: 'Google Ads User Data',
                },
                ad_personalization: {
                    value: adsDefault,
                    name: 'ad_personalization',
                    label: 'Google Ads Personalization',
                },
            }
        },
        analytics: {
            name: 'analytics',
            label: 'analytics',
            disabled: false,
            value: analyticsDefault,
            preferences: {
                analytics_storage: {
                    value: analyticsDefault,
                    name: 'analytics_storage',
                    label: 'Google Analytics Storage',
                }
            }
        },
        personalization: {
            name: 'personalization',
            label: 'personalization',
            disabled: false,
            value: personalizationDefault,
            preferences: {
                personalization_storage: {
                    value: personalizationDefault,
                    name: 'personalization_storage',
                    label: 'Personalization Storage',
                }
            }
        },
    }
    const defaultEncryptedPreferenceGroups = encryptData(defaultPreferenceGroups);
    const [encryptedPreferenceGroups, setEncryptedPreferenceGroups, isFirstLoad, usingInitialValue] = useLocalStorage('cookiePreferenceGroups', defaultEncryptedPreferenceGroups);
    // useEffect(() => {
    //     if (!isFirstLoad) {
    //         // console.log("Localstorage first load done.");
    //         if (encryptedPreferenceGroups !== null) {
    //             // console.log('Value is not null, Now trying to decrypt preferences');
    //             try {
    //                 const decryptedPreferenceGroups = decryptData(encryptedPreferenceGroups);
    //                 // console.log('Successfully decrypted preferences:', decryptedPreferenceGroups);
    //                 setPreferenceGroups(decryptedPreferenceGroups);
    //                 // if (!usingInitialValue) {
    //                 //     setCookieConsentOpen(false);
    //                 // }
    //             } catch (error) {
    //                 // console.error('Error in decrypting preferences:', error);
    //                 // console.log('Setting default preferences');
    //                 setEncryptedPreferenceGroups(defaultEncryptedPreferenceGroups);
    //                 setPreferenceGroups(defaultPreferenceGroups);
    //             }
    //         } else {
    //             // console.log('Value is null, Setting default preferences');
    //             setEncryptedPreferenceGroups(defaultEncryptedPreferenceGroups);
    //             setPreferenceGroups(defaultPreferenceGroups);
    //         }

    //         if (usingInitialValue) {
    //             setCookieConsentOpen(true); // open popup if there are no preferences set by user
    //         }
    //     }

    //     setTimeout(() => {
    //         setGroupsLoaded(true);
    //     }, 100);
    // }, [isFirstLoad]);    

    function convertToGtagOptions(preferenceGroups: PreferenceGroups) {
        const gtagOptions: GtagOptions = {};
        Object.keys(preferenceGroups).map((key) => {
            const preferenceGroup = preferenceGroups[key];
            Object.keys(preferenceGroup.preferences).map((key) => {
                const preference = preferenceGroup.preferences[key];
                gtagOptions[preference.name] = preference.value;
            })
        })
        return gtagOptions;
    }

    // useEffect(() => {
    //     if(!groupsLoaded) {
    //     } else {
    //         if (process.env.NEXT_APP_ENVIRONMENT == "production") {
    //             const convertedOptions = convertToGtagOptions(preferenceGroups);
    //             if ((window as any).gtag !== undefined) {
    //                 console.log('gtag is defined', `\n`, 'now setting consent:', convertedOptions);
    //                 (window as any).gtag('consent', 'default', convertedOptions);
    //                 (window as any).gtag('js', new Date());
    //                 (window as any).gtag('config', 'GTM-T3FDJZZ');
    //             } else {
    //                 console.log('gtag is not defined');
    //             }
    //         } else {
    //             console.log('Not in production, so not sending default consent update to gtag');
    //         }
    //     }
    // }, [groupsLoaded]);

    function onGroupChange(name: string, value: string) {
        const preferencesClone = JSON.parse(JSON.stringify(preferenceGroups));
        const preferenceGroup = preferencesClone[name];
        if (preferenceGroup !== undefined) {
            preferenceGroup.value = value as 'granted' | 'denied';

            Object.keys(preferenceGroup.preferences).map((key) => {
                const preference = preferenceGroup.preferences[key];
                preference.value = value as 'granted' | 'denied';
            });

            setPreferenceGroups(preferencesClone);
        }
    }

    function consentStepChange(newStep: number) {
        setCookieConsentStep(newStep);
    }

    function grantAllPreferences() {
        const preferencesClone = JSON.parse(JSON.stringify(preferenceGroups));
        Object.keys(preferencesClone).map((key) => {
            const preferenceGroup = preferencesClone[key];
            preferenceGroup.value = 'granted';
            Object.keys(preferenceGroup.preferences).map((key) => {
                const preference = preferenceGroup.preferences[key];
                preference.value = 'granted';
            });
        });
        // console.log('grant all preferences', preferencesClone);
        
        setPreferenceGroups(preferencesClone);

        setTimeout(() => {
            save(preferencesClone);
        }, 100);
    }

    function handleCookieSave() {
        save(preferenceGroups);
    }

    function save(preferenceGroups: PreferenceGroups) {
        if (process.env.NEXT_APP_ENVIRONMENT == "production") {
            const encryptedPreferenceGroups = encryptData(preferenceGroups);
            setEncryptedPreferenceGroups(encryptedPreferenceGroups);
            
            const convertedGtagOptions = convertToGtagOptions(preferenceGroups);
            if ((window as any).gtag !== undefined) {
                (window as any).gtag('consent', 'update', convertedGtagOptions);
            }

            setCookieConsentOpen(false);
        } else {
            console.log('Not in production, so not sending consent update to gtag');
            const encryptedPreferenceGroups = encryptData(preferenceGroups);
            setEncryptedPreferenceGroups(encryptedPreferenceGroups);
            setCookieConsentOpen(false);
        }
    }

    return (
        <>
            <div className={`${cookieConsentOpen ? 'fixed' : 'hidden'} z-999 bottom-5 right-1 md:right-5 p-3 md:p-6 rounded-lg bg-primary-gray-950 shadow-lg shadow-black`}>
                {cookieConsentStep === 0 && (
                    <>
                        COOKIE
                        <div className='flex w-full justify-start mt-3 gap-2'>
                            <button onClick={() => consentStepChange(1)} type='button' value={"PREFERENCES"} />
                            <button onClick={grantAllPreferences} type='button' value={"OK"} />
                        </div>
                    </>
                )}
                {cookieConsentStep === 1 && (
                    <>
                        <div className='flex flex-col gap-1 '>
                            {Object.keys(preferenceGroups).map((key, index) => {
                                const preferenceGroup = preferenceGroups[key];
                                return (
                                    // <Toggle key={index} disabled={preferenceGroup.disabled} cookiename={preferenceGroup.name} label={t(preferenceGroup.label)} checked={preferenceGroup.value == 'granted'} onchange={onGroupChange} />
                                    "Toggle"
                                )
                            })}
                        </div>
                        <div className='flex w-full justify-start mt-3'>
                            <button onClick={handleCookieSave} type='button' className='ml-0' value={"SAVE"} />
                        </div>
                    </>
                )}

            </div>
            <div className={`${cookieConsentOpen ? 'hidden' : 'fixed'} bottom-5 z-999 border-primary-yellow-400 border rounded-full ${position === 'left' ? 'left-5' : 'right-5'}`}>
                <button
                    onClick={() => {
                        consentStepChange(1);
                        setCookieConsentOpen(!cookieConsentOpen)
                    }}
                    aria-label="cookie preferences"
                    className="bg-primary-500"
                    color="inherit"
                  >
                    {/* <CookieIcon /> */}
                    ICON
                </button>
            </div>
        </>
    )
}

export default CookieConsent