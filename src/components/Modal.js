import React from "react";

class AlertModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" onClick={this.props.onClose}>
        <div className="modal">
          <div className="modal-title">{this.props.modalTitle}</div>
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

AlertModal.defaultProps = {
  modalTitle: "Your Score"
};

export default AlertModal;
