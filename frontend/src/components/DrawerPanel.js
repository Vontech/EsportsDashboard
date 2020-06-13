
import React, { Component } from "react";

import { Button, Drawer, Tree } from 'antd';
import { MenuOutlined, ImportOutlined, DownOutlined, CodeOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

class DrawerPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {

  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        <MenuOutlined style={styles.hamburger} onClick={this.toggle.bind(this)} />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.toggle.bind(this)}
          visible={this.state.isOpen}
        >
          <Button type="link" icon={<ImportOutlined />} style={styles.logout} onClick={this.props.handleLogout}>
            Logout
          </Button>
        </Drawer>
      </div>
    );
  }

}

const styles = {
  hamburger: {
    position: 'fixed',
    top: 32,
    right: 32
  },
  logout: {
    position: 'absolute',
    bottom: 16,
    left: 8
  },
  devprefs: {
    position: 'absolute',
    bottom: 32,
    left: 8
  }
}

export default DrawerPanel;