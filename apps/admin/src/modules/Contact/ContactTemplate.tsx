import React, { useMemo } from 'react'
import startCase from 'lodash/startCase'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { DetailPage, useCreateMutation } from '@gravis-os/crud'
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TabContent,
  Tabs,
  Typography,
  useTabs,
} from '@gravis-os/ui'
import { contactFormSections, contactModule } from '@admin/modules/Contact'
import useUser from '@admin/app/useUser'
import { ControlledModelField } from '@gravis-os/form'
import { ControlledTextField } from '@gravis-os/fields'
import { projectModule } from '@admin/modules/Project/projectConfig'
import { memoModule } from '@admin/modules/Memo'
import { useList } from '@gravis-os/query'
import {
  Contact,
  ContactLeaflet,
  MemoTimeline,
  StatusUpdateFormCard,
} from '@gravis-os/apps/crm'

export interface ContactTemplateProps {
  item: Contact
}

const ContactTemplate: React.FC<ContactTemplateProps> = (props) => {
  const { item: contact } = props
  const { user } = useUser()

  // List Memos Query
  const onUseListMemos = useList({
    module: memoModule,
    order: ['created_at', { ascending: false }],
    limit: 6,
    match: { contact_id: contact?.id },
    disableWorkspacePlugin: true,
    queryOptions: { enabled: Boolean(contact?.id) },
  })
  const { items: memos } = onUseListMemos

  // Create Memo mutation
  const { createMutation: createMemoMutation } = useCreateMutation({
    module: memoModule,
    options: {
      onSuccess: async () => toast.success('Created successfully.'),
      onError: async () => toast.error('Something went wrong.'),
    },
  })

  // Tabs
  const contactTabs = useMemo(() => {
    return [
      {
        key: 'activity',
        value: 'activity',
        label: 'Activity',
        children: (
          <Stack sx={{ p: 2 }} spacing={3}>
            {/* Status Update */}
            <Stack spacing={1}>
              <Typography
                variant="subtitle1"
                startIcon={<ChatBubbleOutlineOutlinedIcon color="primary" />}
              >
                Post Something
              </Typography>
              <StatusUpdateFormCard
                person={{ ...user, subtitle: user?.role?.title }}
                renderActions={(props) => {
                  const { form } = props
                  const { control, setValue, watch } = form

                  const [lat, lng, priority, project] = watch([
                    'lat',
                    'lng',
                    'priority',
                    'project',
                  ])

                  return (
                    <>
                      <Button
                        variant={lat && lng ? 'callout' : 'text'}
                        startIcon={<LocationOnOutlinedIcon color="primary" />}
                        onClick={(e, d) => {
                          const { setLoading } = d
                          setLoading(true)
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              setValue('lat', position.coords.latitude)
                              setValue('lng', position.coords.longitude)
                              setLoading(false)
                            },
                            () => {
                              setLoading(false)
                            }
                          )
                        }}
                      >
                        Location{lat && lng && `: (${lat}, ${lng})`}
                      </Button>
                      <Button
                        variant={priority ? 'callout' : 'text'}
                        startIcon={
                          <FormatListNumberedOutlinedIcon color="primary" />
                        }
                        popover={
                          <ControlledTextField
                            name="priority"
                            control={control}
                            disableLabel
                            variant="standard"
                            options={[
                              { key: 'low', value: 'low', label: 'Low' },
                              {
                                key: 'medium',
                                value: 'medium',
                                label: 'Medium',
                              },
                              { key: 'high', value: 'high', label: 'High' },
                            ]}
                          />
                        }
                      >
                        {priority ? startCase(priority) : 'Priority'}
                      </Button>
                      <Button
                        variant={project ? 'callout' : 'text'}
                        startIcon={<LibraryBooksOutlinedIcon color="primary" />}
                        popover={
                          <ControlledModelField
                            sx={{ minWidth: 240 }}
                            textFieldProps={{ variant: 'standard' }}
                            name="project"
                            control={control}
                            module={projectModule}
                            setValue={setValue}
                          />
                        }
                      >
                        {project ? project.title : 'Project'}
                      </Button>
                    </>
                  )
                }}
                onSubmit={(values: {
                  content: string
                  priority?: string
                  lat?: string
                  lng?: string
                  project?: { id: number }
                }) => {
                  const { content, priority, lat, lng, project } = values
                  const nextValues = {
                    priority,
                    content,
                    lat,
                    lng,
                    contact_id: contact.id,
                    ...(user && { user_id: user.id }),
                    ...(project && { project_id: project.id }),
                  }
                  createMemoMutation.mutate(nextValues)
                }}
              />
            </Stack>

            <Divider />

            {/* Timeline */}
            <Stack spacing={1}>
              <Typography
                variant="subtitle1"
                startIcon={<HistoryOutlinedIcon color="primary" />}
              >
                Past Activity
              </Typography>
              <MemoTimeline items={memos} queryResult={onUseListMemos} />
            </Stack>
          </Stack>
        ),
      },
      {
        key: 'general',
        value: 'general',
        label: 'General',
        children: (
          <Box sx={{ py: 2 }}>
            <DetailPage
              module={contactModule}
              formSections={contactFormSections}
              headerProps={{ disableBreadcrumbs: true }}
              containerProps={{ maxWidth: false }}
            />
          </Box>
        ),
      },
      {
        key: 'contacts',
        value: 'contacts',
        label: 'Contacts',
        children: 'Contacts',
      },
      {
        key: 'projects',
        value: 'projects',
        label: 'Projects',
        children: 'Projects',
      },
      {
        key: 'quotations',
        value: 'quotations',
        label: 'Quotations',
        children: 'Quotations',
      },
      {
        key: 'invoices',
        value: 'invoices',
        label: 'Invoices',
        children: 'Invoices',
      },
      { key: 'files', value: 'files', label: 'Files', children: 'Files' },
    ]
  }, [user])
  const tabs = useTabs({ tabs: contactTabs })

  return (
    <div>
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={0}>
          {/* Left Aside */}
          <Grid item md={4} lg={3}>
            <ContactLeaflet
              item={contact}
              sx={{ minHeight: { md: '100vh' }, height: '100%' }}
            />
          </Grid>

          {/* Main */}
          <Grid item xs={12} md={8} lg={9}>
            <Tabs {...tabs} />
            <TabContent {...tabs} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ContactTemplate
