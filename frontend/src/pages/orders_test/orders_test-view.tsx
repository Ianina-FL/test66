import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/orders_test/orders_testSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Orders_testView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders_test } = useAppSelector((state) => state.orders_test);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View orders_test')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View orders_test')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/orders_test/orders_test-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='Order date'>
            {orders_test.order_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  orders_test.order_date
                    ? new Date(
                        dayjs(orders_test.order_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No Order date</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Customer</p>

            <p>{orders_test?.customer?.first_name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Coffee_blends</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Price</th>

                      <th>StockLevel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders_test.coffee_blends &&
                      Array.isArray(orders_test.coffee_blends) &&
                      orders_test.coffee_blends.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/coffee_blends/coffee_blends-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='stock_level'>{item.stock_level}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders_test?.coffee_blends?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Payment</p>

            <p>{orders_test?.payment?.amount ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/orders_test/orders_test-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Orders_testView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORDERS_TEST'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Orders_testView;
