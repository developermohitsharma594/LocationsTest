import React, { useEffect, useState } from "react";
import { path, not, prop } from "ramda";
import LinkedReferenceParametersTable from "components/LinkedReferenceParametersTable";
import { Loading } from "components/chec";
import SupportParameterEditor from "components/SupportParameterEditors/SupportParameterEditor";
import { Col, Row } from "components/patterns";
import { getSwitchContext } from "utils/switchData";
import ErrorBoundary from "components/ErrorBoundary";
import strings from "utils/strings.js";

const SupportParameterSchematic = (props) => {
  const {
    signals,
    param,
    linkedRPs,
    currentSPUri,
    onDuplicate,
    onEdit,
    onCancel,
    onSave,
    siblingSPs,
    requestSPDetails,
    setSpToEdit,
    isEditRoute,
    spBeingEdited,
    isDuplicating,
    isLoading,
    onUnmount,
  } = props;

  const [spUri, setUri] = useState(null);

  useEffect(() => {
    if (
      not(path(["param", "status"], props)) ||
      (!isLoading && !isDuplicating && (!param || !param.id))
    ) {
      requestSPDetails();
    }

    if (prop("id", param) && isEditRoute && !spBeingEdited) {
      setSpToEdit();
    }

    return () => {
      onUnmount();
    };
  }, [
    isDuplicating,
    isEditRoute,
    isLoading,
    onUnmount,
    param,
    props,
    requestSPDetails,
    setSpToEdit,
    spBeingEdited,
  ]);

  return !param ? (
    <Loading />
  ) : (
    <ErrorBoundary
      signal={[signals.getSupportParam, signals.duplicateSupportParameter]}
    >
      <Row>
        {" "}
        <Col span={24}>
          <SupportParameterEditor
            param={param}
            siblingSPs={siblingSPs}
            currentSPUri={currentSPUri}
            onDuplicate={onDuplicate}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
            switchContext={
              linkedRPs && linkedRPs[0]
                ? getSwitchContext(
                    linkedRPs[0].refParameterNumber,
                    linkedRPs[0].release
                  )
                : "smartPlex"
            }
            linkedRPs={linkedRPs}
          />
        </Col>
        <Col span={24}>
          <div className="sp-schematic_reference-parameters">
            <span className="sp-schematic_linked-params-table-caption">
              {strings.rps_in_use}
            </span>
            <ErrorBoundary signal={signals.getLinkedRPs}>
              <LinkedReferenceParametersTable dataSource={linkedRPs} />
            </ErrorBoundary>
          </div>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};
