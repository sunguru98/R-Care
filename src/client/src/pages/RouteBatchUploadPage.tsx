import React, { useState, FormEvent, ChangeEvent, Fragment } from 'react';
import Spinner from '../components/Spinner';
import BatchUploadErrorList from '../components/BatchUploadErrorList';
import { connect, ConnectedProps } from 'react-redux';
import { createMultipleRoutes } from '../redux/actions/routeActions';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { BatchError } from '../types/redux/reducers/routeReducer.type';

interface RouteBatchUploadPageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const RouteBatchUploadPage: React.FC<RouteBatchUploadPageProps> = ({
  routeLoading,
  errors,
  createMultipleRoutes
}) => {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (
      file &&
      window.confirm('Are you sure to proceed with the uploading process?')
    ) {
      const data = new FormData();
      data.append('routes', file);
      createMultipleRoutes(data);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const fileObj: File = e.target.files![0];
    if (fileObj) {
      if (fileObj.type !== 'text/csv') {
        e.target.value = '';
        return alert('File type must be CSV');
      }
      if (fileObj.size > 1024 * 1024 * 10) {
        e.target.value = '';
        return alert('File size too large');
      }
      setFile(fileObj);
    }
  };

  return (
    <section className='page' style={{ height: 'calc(105vh - 10rem)' }}>
      <div className='Form' style={{ padding: '3rem' }}>
        <h1>{!routeLoading ? 'Upload CSV File' : 'Please wait'}</h1>
        {routeLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p style={{ textAlign: 'center' }}>
              Before uploading the routes file, <br /> Kindly follow the
              instructions below, to get a perfect match in upload result.
            </p>
            <ol style={{ lineHeight: 1.5, margin: '2rem 0', width: '85%' }}>
              <li>
                The order of the columns must be as the following
                <ul
                  style={{
                    listStyle: 'circle',
                    marginLeft: '2rem'
                  }}>
                  <li>S.No</li>
                  <li>Name</li>
                  <li>Direction</li>
                  <li>Status</li>
                  <li>Stops</li>
                  <li>Route-Type</li>
                </ul>
              </li>
              <li>
                Direction should be either <strong>up</strong> or{' '}
                <strong>down</strong>
              </li>
              <li>
                Status should be either <strong>active</strong> or{' '}
                <strong>inactive</strong>
              </li>
              <li>
                Route Type should be either <strong>AC</strong> or{' '}
                <strong>General</strong>
              </li>
              <li>
                Stops should be of the following format
                <ul
                  style={{
                    listStyle: 'circle',
                    marginLeft: '2rem'
                  }}>
                  <li>
                    Stop name - <strong>(Longitude:Latitude)</strong>
                  </li>
                  <li>
                    Each stop should be separated by <strong>"&"</strong>
                  </li>
                </ul>
              </li>
            </ol>

            <form onSubmit={handleSubmit}>
              <input required type='file' onChange={handleChange} name='file' />
              <input
                style={{
                  marginTop: '2rem',
                  marginLeft: '50%',
                  transform: 'translateX(-50%)'
                }}
                className={`Button ${routeLoading ? 'disabled' : ''}`}
                disabled={routeLoading}
                type='submit'
                value='Upload file'
              />
            </form>
          </Fragment>
        )}
        {errors && errors.length ? (
          <BatchUploadErrorList errors={errors as BatchError[]} />
        ) : null}
      </div>
    </section>
  );
};

const mapStateToProps = ({ route: { routeLoading, errors } }: RootState) => ({
  routeLoading,
  errors
});
const mapDispatchToProps = { createMultipleRoutes };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RouteBatchUploadPage);
