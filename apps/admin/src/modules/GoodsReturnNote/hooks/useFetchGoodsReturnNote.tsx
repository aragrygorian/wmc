import { initUseFetch, initUseFetchCount } from '@admin/lib/useFetch'
import { goodsReturnNoteModule } from '@admin/modules/GoodsReturnNote/goodsReturnNoteConfig'
import { GoodsReturnNote } from '@admin/modules/GoodsReturnNote/types'

export const useFetchGoodsReturnNotes = initUseFetch<GoodsReturnNote>(
  goodsReturnNoteModule
)

export const useFetchGoodsReturnNoteCount = initUseFetchCount(
  goodsReturnNoteModule
)
