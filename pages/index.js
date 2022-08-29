import { Auth, Card, Typography, Space, Button} from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import { useState } from 'react'

const Index = () => {
  const { user, session } = Auth.useUser()
  const [ authView ] = useState('sign_in')

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical">
          <div>
            <Typography.Title level={3}>
              Next + Supabase Auth Starter
            </Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            view={authView}
            // providers={['google', 'github']}
            // socialLayout="horizontal"
            // socialButtonSize="xlarge"
          />
        </Space>
      )

    return (
      <Space direction="vertical" size={6}>
        {authView === 'update_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>

            <Button
              type="outline"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </Button>
          </>
        )}
      </Space>
    )
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <View />
      </Card>
    </div>
  )
}

export default Index
