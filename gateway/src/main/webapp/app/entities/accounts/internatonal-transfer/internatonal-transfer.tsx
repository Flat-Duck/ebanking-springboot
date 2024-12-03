import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './internatonal-transfer.reducer';

export const InternatonalTransfer = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const internatonalTransferList = useAppSelector(state => state.gateway.internatonalTransfer.entities);
  const loading = useAppSelector(state => state.gateway.internatonalTransfer.loading);
  const totalItems = useAppSelector(state => state.gateway.internatonalTransfer.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="internatonal-transfer-heading" data-cy="InternatonalTransferHeading">
        <Translate contentKey="gatewayApp.accountsInternatonalTransfer.home.title">Internatonal Transfers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.accountsInternatonalTransfer.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/internatonal-transfer/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.accountsInternatonalTransfer.home.createLabel">Create new Internatonal Transfer</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {internatonalTransferList && internatonalTransferList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('senderAccountNumber')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.senderAccountNumber">Sender Account Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('senderAccountNumber')} />
                </th>
                <th className="hand" onClick={sort('recipientIban')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.recipientIban">Recipient Iban</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('recipientIban')} />
                </th>
                <th className="hand" onClick={sort('swiftCode')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.swiftCode">Swift Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('swiftCode')} />
                </th>
                <th className="hand" onClick={sort('recipientName')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.recipientName">Recipient Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('recipientName')} />
                </th>
                <th className="hand" onClick={sort('amount')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.amount">Amount</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('amount')} />
                </th>
                <th className="hand" onClick={sort('currency')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.currency">Currency</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('currency')} />
                </th>
                <th className="hand" onClick={sort('transactionDate')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.transactionDate">Transaction Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('transactionDate')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.accountsInternatonalTransfer.bankAccount">Bank Account</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {internatonalTransferList.map((internatonalTransfer, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/internatonal-transfer/${internatonalTransfer.id}`} color="link" size="sm">
                      {internatonalTransfer.id}
                    </Button>
                  </td>
                  <td>{internatonalTransfer.senderAccountNumber}</td>
                  <td>{internatonalTransfer.recipientIban}</td>
                  <td>{internatonalTransfer.swiftCode}</td>
                  <td>{internatonalTransfer.recipientName}</td>
                  <td>{internatonalTransfer.amount}</td>
                  <td>
                    <Translate contentKey={`gatewayApp.CurrencyType.${internatonalTransfer.currency}`} />
                  </td>
                  <td>
                    {internatonalTransfer.transactionDate ? (
                      <TextFormat type="date" value={internatonalTransfer.transactionDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{internatonalTransfer.description}</td>
                  <td>
                    {internatonalTransfer.bankAccount ? (
                      <Link to={`/bank-account/${internatonalTransfer.bankAccount.id}`}>{internatonalTransfer.bankAccount.iban}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/internatonal-transfer/${internatonalTransfer.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/internatonal-transfer/${internatonalTransfer.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/internatonal-transfer/${internatonalTransfer.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gatewayApp.accountsInternatonalTransfer.home.notFound">No Internatonal Transfers found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={internatonalTransferList && internatonalTransferList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default InternatonalTransfer;
