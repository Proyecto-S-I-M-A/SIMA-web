import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
  
} from '@mui/material';
import { useCreateRecetaWithDosisMutation } from '~/lib/api/QueryReceta';
import type { RecetasDosisCreation } from '~/types/receta';
import { RecetasDosisSchema } from '~/types/receta';
import CustomeSelectQuery from '~/components/CustomeSelectQuery';


export function RecetaAndDosisForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RecetasDosisCreation>({
    resolver: zodResolver(RecetasDosisSchema),
    defaultValues: {
      Receta: {
        id_cliente: undefined,
        doctor_remitente: '',
        ruc_doctor_remitente: '',
        hospital_remitente: '',
        telefono_hospital: '',
        correo: '',
        codigo: null,
        fecha: null,
      },
      Dosis: [
        {
          id_medicamento: null,
          cantidad: null,
          instrucciones: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Dosis',
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useCreateRecetaWithDosisMutation();

  const onSubmit = (data: RecetasDosisCreation) => {
    mutateAsync(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {isSuccess && (
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
            ✓ Receta y dosis creadas exitosamente
          </Typography>
        )}

        {isError && (
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>
            ✗ {error instanceof Error ? error.message : 'Error al crear receta y dosis'}
          </Typography>
        )}

        {/* Sección de Receta */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Información de la Receta
            </Typography>

            <Stack spacing={2}>
              <Controller
                name="Receta.id_cliente"
                control={control}
                render={({ field }) => (
                  <>
                    {errors.Receta?.id_cliente && (
                      <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {errors.Receta.id_cliente.message}
                      </Typography>
                    )}
                    <CustomeSelectQuery
                      label='ID Cliente'
                      labelID='client'
                      endpoint='clientes'
                      onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                      value={Number(field.value) || undefined}
                      valueSelector='id'
                      labelSelector='nombre'
                      secondaryLabelSelector='apellido'
                    />
                  </>
                )}
              />

              <Controller
                name="Receta.doctor_remitente"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Doctor remitente"
                    placeholder="Dr. Juan Pérez"
                    variant="outlined"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />

              <Controller
                name="Receta.ruc_doctor_remitente"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="RUC doctor remitente"
                    placeholder="123456789"
                    variant="outlined"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />

              <Controller
                name="Receta.hospital_remitente"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Hospital remitente"
                    placeholder="Hospital Central"
                    variant="outlined"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />

              <Controller
                name="Receta.telefono_hospital"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Teléfono del hospital"
                    placeholder="0999999999"
                    variant="outlined"
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />

              <Controller
                name="Receta.correo"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Correo"
                    type="email"
                    placeholder="doctor@hospital.com"
                    variant="outlined"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                )}
              />

              <Controller
                name="Receta.codigo"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Código"
                    type="number"
                    variant="outlined"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? null : Number(e.target.value))
                    }
                  />
                )}
              />

              <Controller
                name="Receta.fecha"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    value={field.value ? new Date(field.value).toISOString().slice(0, 10) : ''}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
                )}
              />
            </Stack>
          </CardContent>
        </Card>

        <Divider />

        {/* Sección de Dosis */}
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Dosis ({fields.length})
              </Typography>

              {errors.Dosis?.root && (
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {errors.Dosis.root.message}
                </Typography>
              )}

              {fields.map((field, index) => (
                <Card key={field.id} variant="outlined" sx={{ bgcolor: 'action.hover' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Dosis {index + 1}
                        </Typography>
                        {fields.length > 1 && (
                          <Button
                          size='small'
                          onClick={() => remove(index)}
                          sx={{ color: 'error.main'}}
                          >
                            x
                          </Button>
                        
                        )}
                      </Stack>

                      <Controller
                        name={`Dosis.${index}.id_medicamento`}
                        control={control}
                        render={({ field }) => (
                          <>
                            {errors.Dosis?.[index]?.id_medicamento && (
                              <Typography variant="body2" sx={{ color: 'error.main' }}>
                                {errors.Dosis[index]?.id_medicamento?.message}
                              </Typography>
                            )}
                            <CustomeSelectQuery
                              endpoint='inventario'
                              onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                              value={Number(field.value) || undefined}
                              valueSelector='id'
                              labelSelector='nombre_medicamento'
                              label='Medicamento'
                              labelID='med'
                            />
                          </>
                        )}
                      />

                      <Controller
                        name={`Dosis.${index}.cantidad`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Cantidad"
                            type="number"
                            variant="outlined"
                            value={field.value ?? ''}
                            onChange={(e) =>
                              field.onChange(e.target.value === '' ? null : Number(e.target.value))
                            }
                          />
                        )}
                      />

                      <Controller
                        name={`Dosis.${index}.instrucciones`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Instrucciones"
                            placeholder="Tomar después de las comidas"
                            variant="outlined"
                            multiline
                            rows={2}
                            {...field}
                            value={field.value || ''}
                          />
                        )}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outlined"
                onClick={() =>
                  append({
                    id_medicamento: null,
                    cantidad: null,
                    instrucciones: '',
                  })
                }
                sx={{ alignSelf: 'flex-start' }}
              >
                Agregar Dosis
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ mt: 2, bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1b5e20' } }}
          fullWidth
        >
          {isPending ? 'Creando…' : 'Crear Receta con Dosis'}
        </Button>
      </Stack>
    </form>
  );
}
