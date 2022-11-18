import { Box, Container, Step, StepLabel, Stepper } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import AccountsSetup from '../../atoms/AccountsSetup/AccountsSetup';
import AdditionalServices from '../../atoms/AdditionalServices/AdditionalServices';
import ClusterParams from '../../atoms/ClusterParams/ClusterParams';
import NetworkParams from '../../atoms/NetworkParams/NetworkParams';
import ProviderSelect from '../../atoms/ProviderSelect/ProviderSelect';
import { ESetupStep, ISetupPageProps } from './setup.Types';

const SetupPage: FC<ISetupPageProps> = () => {
  const [activeStep, setActiveStep] = useState<ESetupStep>(ESetupStep.PROVIDER);

  const steps = [
    ESetupStep.PROVIDER,
    ESetupStep.NETWORK_PARAMS,
    ESetupStep.CLUSTER_PARAMS,
    ESetupStep.ACCOUNTS_SETUP,
    ESetupStep.ADDITIONAL_SERVICES
  ];

  const renderActiveStep = () => {
    switch (activeStep) {
      case ESetupStep.PROVIDER:
        return <ProviderSelect next={handleNext} />;
      case ESetupStep.NETWORK_PARAMS:
        return <NetworkParams next={handleNext} />;
      case ESetupStep.CLUSTER_PARAMS:
        return <ClusterParams next={handleNext} />;
      case ESetupStep.ACCOUNTS_SETUP:
        return <AccountsSetup next={handleNext} />;
      default:
        return <AdditionalServices next={handleNext} />;
    }
  };

  const handleNext = () => {
    switch (activeStep) {
      case ESetupStep.PROVIDER:
        setActiveStep(ESetupStep.NETWORK_PARAMS);
        break;
      case ESetupStep.NETWORK_PARAMS:
        setActiveStep(ESetupStep.CLUSTER_PARAMS);
        break;
      case ESetupStep.CLUSTER_PARAMS:
        setActiveStep(ESetupStep.ACCOUNTS_SETUP);
        break;
      case ESetupStep.ACCOUNTS_SETUP:
        setActiveStep(ESetupStep.ADDITIONAL_SERVICES);
        break;
      case ESetupStep.ADDITIONAL_SERVICES:
        setActiveStep(ESetupStep.DONE);
        break;
    }
  };

  useEffect(() => {
    if (activeStep === ESetupStep.DONE) {
      // TODO
      console.log('Finished!');
    }
  }, [activeStep]);

  return (
    <Container maxWidth={'lg'} fixed={true}>
      <Box width={'100%'} height={'100%'} mt={4}>
        <Stepper activeStep={steps.indexOf(activeStep)}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {renderActiveStep()}
      </Box>
    </Container>
  );
};

export default SetupPage;
