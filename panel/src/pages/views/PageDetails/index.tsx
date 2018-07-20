import * as React from "react";
import { Query } from "react-apollo";
import { ApolloError } from "apollo-client";

import qPage from "../../queries/qPage";
import PageDetailsPage from "../../components/PageDetailsPage";
import Navigator from "../../../components/Navigator";
import MutationProvider from "./MutationProvider";
import { urls } from "../../../";
import { TransactionState } from "../../../";

const dummy = () => {};

interface Props {
  id: string;
}
interface State {
  transaction: TransactionState;
}
export class PageDetails extends React.Component<Props, State> {
  state = {
    transaction: "default" as "default"
  };

  handleUpdate = () => {
    this.setState({ transaction: "success" });
    setTimeout(() => this.setState({ transaction: "default" }), 3000);
  };
  handleUpdateError = (event: ApolloError) => {
    this.setState({ transaction: "error" });
    setTimeout(() => this.setState({ transaction: "default" }), 3000);
  };

  render() {
    const { id } = this.props;
    return (
      <Navigator>
        {navigate => (
          <Query query={qPage} variables={{ id }} fetchPolicy="network-only">
            {({ data, error, loading }) => {
              if (error) {
                console.error(error);
                return JSON.stringify(error);
              }
              const handleBack = () =>
                navigate(
                  urls.directoryDetails(
                    data && data.page && data.page.parent
                      ? data.page.parent.id
                      : undefined
                  )
                );
              const handleDelete = handleBack;
              return (
                <MutationProvider
                  id={id}
                  onPageUpdate={this.handleUpdate}
                  onPageDelete={handleDelete}
                  onError={dummy}
                >
                  {({ deletePage, updatePage }) => {
                    const formLoading = updatePage.loading;
                    const modalLoading = deletePage.loading;
                    return (
                      <PageDetailsPage
                        disabled={formLoading || modalLoading}
                        loading={formLoading || modalLoading}
                        transaction={this.state.transaction}
                        page={data ? data.page : undefined}
                        onBack={handleBack}
                        onDelete={deletePage.mutate}
                        onSubmit={updatePage.mutate}
                      />
                    );
                  }}
                </MutationProvider>
              );
            }}
          </Query>
        )}
      </Navigator>
    );
  }
}
export default PageDetails
