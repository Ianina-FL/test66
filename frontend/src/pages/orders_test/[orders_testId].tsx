import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/orders_test/orders_testSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditOrders_test = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    order_date: new Date(),

    customer: null,

    coffee_blends: [],

    payment: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { orders_test } = useAppSelector((state) => state.orders_test);

  const { orders_testId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: orders_testId }));
  }, [orders_testId]);

  useEffect(() => {
    if (typeof orders_test === 'object') {
      setInitialValues(orders_test);
    }
  }, [orders_test]);

  useEffect(() => {
    if (typeof orders_test === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = orders_test[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [orders_test]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: orders_testId, data }));
    await router.push('/orders_test/orders_test-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit orders_test')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit orders_test'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Order date'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.order_date
                      ? new Date(
                          dayjs(initialValues.order_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, order_date: date })
                  }
                />
              </FormField>

              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'customers'}
                  showField={'first_name'}
                ></Field>
              </FormField>

              <FormField label='Coffee_blends' labelFor='coffee_blends'>
                <Field
                  name='coffee_blends'
                  id='coffee_blends'
                  component={SelectFieldMany}
                  options={initialValues.coffee_blends}
                  itemRef={'coffee_blends'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Payment' labelFor='payment'>
                <Field
                  name='payment'
                  id='payment'
                  component={SelectField}
                  options={initialValues.payment}
                  itemRef={'payments'}
                  showField={'amount'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/orders_test/orders_test-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditOrders_test.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ORDERS_TEST'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditOrders_test;
