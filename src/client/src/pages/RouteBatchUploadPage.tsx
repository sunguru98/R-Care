import React, { useState, FormEvent, ChangeEvent } from 'react';
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
    console.log('Is it working?');
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
    <div>
      <h1>Upload CSV File</h1>
      <p>
        Before uploading the routes file. Kindly follow the instructions below,
        to get a perfect match in upload result.
      </p>
      <ul>
        <li>
          The order must be as S.No, Name, Direction, Status, Stops and
          Route-Type
        </li>
        <li>Direction should be either up or down</li>
        <li>Status should be either active or inactive</li>
        <li>Route Type should be either AC or General</li>
        <li>
          Stops should be of the following format
          <ul>
            <li>Stop name - (Longitude:Latitude)</li>
            <li>Each stop should be separated by &</li>
          </ul>
        </li>
      </ul>
      {!routeLoading ? (
        <form onSubmit={handleSubmit}>
          <input required type='file' onChange={handleChange} name='file' />
          <input type='submit' value='Upload File' />
        </form>
      ) : (
        <Spinner />
      )}
      {errors && errors.length ? (
        <BatchUploadErrorList errors={errors as BatchError[]} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ route: { routeLoading, errors } }: RootState) => ({
  routeLoading,
  errors
});
const mapDispatchToProps = { createMultipleRoutes };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RouteBatchUploadPage);
